import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Torus, Float, useScroll, Preload } from '@react-three/drei'
import * as THREE from 'three'

export default function Experience({ theme }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const groupRef = useRef()
  const scroll = useScroll()
  const { viewport } = useThree()
  
  const isDark = theme === 'dark'

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const offset = scroll.offset
    const { x, y } = state.mouse

    if (groupRef.current) {
      // Fluid movement that follows scroll and mouse
      groupRef.current.position.y = -offset * 2
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.3 + offset * 0.5, 0.1)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3 + time * 0.2, 0.1)
    }

    if (materialRef.current && materialRef.current.userData.shader) {
      // Reveal the "written" path
      materialRef.current.userData.shader.uniforms.uProgress.value = Math.min(1, offset * 3)
    }
  })

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 1
    const context = canvas.getContext('2d')
    const gradient = context.createLinearGradient(0, 0, 256, 0)
    gradient.addColorStop(0, '#380FDC')
    gradient.addColorStop(0.3, '#386DDA')
    gradient.addColorStop(0.55, '#8D9EDC')
    gradient.addColorStop(0.75, '#8647C3')
    gradient.addColorStop(1, '#BD6FC5')
    context.fillStyle = gradient
    context.fillRect(0, 0, 256, 1)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  return (
    <group ref={groupRef} position={[viewport.width > 10 ? 3.5 : 0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        
        {/* THE WRITTEN "O" - Shader Reveal */}
        <Torus args={[1.5, 0.35, 32, 100]}>
          <meshPhysicalMaterial
            ref={materialRef}
            map={gradientTexture}
            emissiveMap={gradientTexture}
            emissive="#ffffff"
            emissiveIntensity={0.4}
            metalness={0.2}
            roughness={0.2}
            transparent
            onBeforeCompile={(shader) => {
              shader.uniforms.uProgress = { value: 0 }
              shader.fragmentShader = `
                uniform float uProgress;
                ${shader.fragmentShader}
              `.replace(
                '#include <clipping_planes_fragment>',
                `#include <clipping_planes_fragment>
                 if (vUv.x > uProgress) discard;`
              )
              materialRef.current.userData.shader = shader
            }}
          />
        </Torus>

      </Float>
      
      <Swarm theme={theme} />
      <Preload all />
    </group>
  )
}

function Swarm({ count = 1000, theme }) {
  const meshRef = useRef()
  const { viewport, mouse } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const gradientColors = ['#380FDC', '#386DDA', '#8D9EDC', '#8647C3', '#BD6FC5']
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      const color = new THREE.Color(gradientColors[Math.floor(Math.random() * gradientColors.length)])
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color })
    }
    return temp
  }, [count])

  useEffect(() => {
    particles.forEach((particle, i) => {
      meshRef.current.setColorAt(i, particle.color)
    })
    meshRef.current.instanceColor.needsUpdate = true
  }, [particles])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (mouse.x * viewport.width - particle.mx) * 0.01
      particle.my += (mouse.y * viewport.height - particle.my) * 0.01
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (viewport.width / 2) * particle.mx,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (viewport.height / 2) * particle.my,
        (particle.my / 10) * s + zFactor + Math.cos((t / 10) * factor)
      )
      
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial emissive="#ffffff" emissiveIntensity={0.2} />
    </instancedMesh>
  )
}
