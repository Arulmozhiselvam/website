import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, ScrollControls } from '@react-three/drei'
import { Suspense } from 'react'
import Experience from './Experience'

export default function Scene({ theme }) {
  const bgColor = theme === 'dark' ? '#0a0907' : '#f0ede6'
  
  return (
    <div className="canvas-container">
      <Canvas dpr={[1, 2]} style={{ background: theme === 'dark' ? '#050505' : '#f8fafc', transition: 'background 0.6s ease' }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          <ambientLight intensity={0.2} />
          
          {/* 5-STOP GRADIENT LIGHTING */}
          <pointLight position={[10, 10, 10]} intensity={3} color="#380FDC" />
          <pointLight position={[-10, -10, 10]} intensity={2} color="#386DDA" />
          <pointLight position={[10, -10, -10]} intensity={2} color="#8647C3" />
          <pointLight position={[-10, 10, -10]} intensity={2} color="#BD6FC5" />
          
          <ScrollControls pages={4} damping={0.2}>
            <Experience theme={theme} />
          </ScrollControls>
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
