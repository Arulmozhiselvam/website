import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Scene from './Scene'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Sun, Moon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── NAVIGATION COMPONENT ──
const Navbar = ({ theme, toggleTheme, scrolled, menuOpen, setMenuOpen }) => (
  <>
    <nav className={scrolled ? 'scrolled' : ''} style={{
      padding: scrolled ? '15px 30px' : '30px 30px',
      background: scrolled ? 'var(--bg)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      position: 'fixed', top: 0, width: '100%', zIndex: 3000, transition: 'all 0.4s'
    }}>
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <img 
          src={theme === 'dark' ? "/assets/Group 1686556745.png" : "/assets/Group 1686556744.png"} 
          alt="FromZero" 
          style={{height: '24px', display: 'block'}} 
        />
      </Link>
      
      <div className="desktop-nav" style={{display: 'flex', gap: '3.5rem', alignItems: 'center'}}>
        {['Services', 'Work', 'Pricing'].map(item => (
          <Link key={item} to={`/${item.toLowerCase()}`} className="nav-link">
            {item}
          </Link>
        ))}
      </div>

      <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    {/* MOBILE MENU OVERLAY */}
    <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
      <div className="mobile-menu-links">
        {['Home', 'Services', 'Work', 'Pricing', 'Contact'].map((item, i) => (
          <Link 
            key={item} 
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
            onClick={() => setMenuOpen(false)}
            style={{transitionDelay: `${i * 0.1}s`}}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="mobile-menu-footer">
        <a href="#">TWITTER</a>
        <a href="#">INSTAGRAM</a>
        <a href="#">LINKEDIN</a>
      </div>
    </div>
  </>
)

// ── PAGE COMPONENTS ──
const Home = ({ theme }) => (
  <main>
    {/* HERO */}
    <section id="hero" className="hero-section">
      <div className="line-mask"><div className="sec-label">FZ // 001</div></div>
      <div className="line-mask"><h1>Growth isn't</h1></div>
      <div className="line-mask"><h1>random. We</h1></div>
      <div className="line-mask"><h1><em>engineer it.</em></h1></div>
      <div className="line-mask" style={{marginTop: '3rem'}}>
        <p className="sub-text" style={{maxWidth: '800px'}}>
          Growth engineering for D2C brands doing ₹10L–₹50L/month. 
          We diagnose bottlenecks, fix what's broken, and build systems that scale.
        </p>
      </div>
    </section>
    {/* 02 / SYMPTOMS */}
    <section style={{minHeight: 'auto', padding: '10rem 10%', background: 'var(--text)', color: 'var(--bg)'}}>
      <div className="line-mask"><div className="sec-label" style={{color: 'var(--bg)'}}>02 / Symptoms</div></div>
      <div className="reveal" style={{marginTop: '4rem'}}>
        {[
          '01 Ads are running. Growth isn\'t compounding.',
          '02 Revenue moves. Margins don\'t.',
          '03 You scale… then reset.',
          '04 Nothing connects.'
        ].map((s, i) => (
          <div key={i} className="line-mask"><h3 style={{color: 'var(--bg)', fontSize: 'clamp(24px, 4vw, 48px)', marginBottom: '1.5rem'}}>{s}</h3></div>
        ))}
        <div className="reveal" style={{marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem'}}>
          <h2 style={{color: 'var(--bg)', fontSize: '40px'}}>This isn't a marketing problem. <br />It's a <span style={{color: 'var(--primary)'}}>system problem.</span></h2>
        </div>
      </div>
    </section>

    {/* 03 / POSITIONING */}
    <section style={{minHeight: 'auto', padding: '10rem 10%'}}>
      <div className="line-mask"><div className="sec-label">03 / Positioning</div></div>
      <div className="line-mask">
        <h2 style={{fontSize: 'clamp(40px, 6vw, 100px)', lineHeight: '1.1'}}>
          Not an ads agency.<br />We <em>engineer</em> outcomes.
        </h2>
      </div>
      <div className="reveal" style={{marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem'}}>
        <p className="sub-text">
          We don't run random ads / We build growth systems. We don't promise hacks / We engineer outcomes. We don't bill for hours / We're paid for results.
        </p>
        <p className="sub-text">
          Growth happens when everything works together — not when one channel gets lucky. We provide the architecture for compounding revenue.
        </p>
      </div>
    </section>

    {/* 04 / METHOD */}
    <section>
      <div className="line-mask"><div className="sec-label">04 / Method</div></div>
      <div className="line-mask"><h2>Three steps.</h2></div>
      <div className="line-mask"><h2>One system.</h2></div>
      <div style={{marginTop: '5rem'}}>
        {[
          { n: '01 Diagnose', d: 'Funnel audit. Cohort math. Channel attribution. We read your numbers.' },
          { n: '02 Fix', d: 'Offer architecture, LP conversion, post-purchase flows. We close the leaks.' },
          { n: '03 Scale', d: 'Documented playbooks. Predictable CAC bands. Compounding revenue.' }
        ].map((s, i) => (
          <div key={i} className="reveal" style={{padding: '4rem 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{fontSize: 'clamp(30px, 4vw, 60px)', fontWeight: '900', textTransform: 'uppercase'}}>{s.n}</h3>
            <div className="sub-text" style={{maxWidth: '400px', fontSize: '14px'}}>{s.d}</div>
          </div>
        ))}
      </div>
      <Link to="/services" className="reveal" style={{display: 'inline-block', marginTop: '3rem', fontWeight: '900', color: 'var(--text)', textDecoration: 'none', fontSize: '14px', borderBottom: '2px solid var(--text)'}}>VIEW ALL SERVICES</Link>
    </section>

    {/* FEATURED WORK */}
    <section>
      {/* PROJECT PREVIEW */}
      <div style={{marginTop: '8rem'}}>
        <div className="line-mask"><div className="sec-label">Selected Impact</div></div>
        <div className="line-mask"><h2>Recent</h2></div>
        <div className="line-mask"><h2>Deployments.</h2></div>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '4rem'}}>
          {[
            { t: 'Studio Thari', c: 'Luxury Ethnic Wear', img: '/assets/studiothari.png' },
            { t: 'Sieben Tech', c: 'Premium Audio & Earbuds', img: '/assets/sieben.png' }
          ].map((w, i) => (
            <div key={i} className="work-card reveal">
              <div style={{height: '500px', background: `url(${w.img}) center/cover no-repeat`, borderRadius: '4px', overflow: 'hidden', position: 'relative'}}>
                <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)'}}></div>
              </div>
              <div style={{padding: '1.5rem 0'}}>
                <div style={{fontSize: '24px', fontWeight: '900', textTransform: 'uppercase'}}>{w.t}</div>
                <div style={{fontSize: '11px', color: 'var(--muted)', marginTop: '0.5rem', letterSpacing: '0.1em'}}>{w.c}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Link to="/work" className="reveal" style={{display: 'inline-block', marginTop: '3rem', fontWeight: '900', color: 'var(--text)', textDecoration: 'none', fontSize: '14px', borderBottom: '2px solid var(--text)'}}>VIEW ALL CASE STUDIES</Link>
    </section>


    {/* TESTIMONIALS */}
    <section style={{background: 'var(--text)', color: 'var(--bg)'}}>
      <div className="line-mask"><div className="sec-label" style={{color: 'var(--bg)'}}>Track Record</div></div>
      <div className="line-mask">
        <h2 style={{color: 'var(--bg)', fontSize: 'clamp(30px, 5vw, 60px)', italic: 'true'}}>
          "We were stuck at ₹22L for nine months. Three weeks in, they pointed out two things we'd been ignoring — repeat rate and creative fatigue. We crossed ₹50L the next quarter."
        </h2>
      </div>
      <div className="reveal" style={{marginTop: '4rem'}}>
        <div style={{fontWeight: '900', fontSize: '18px', textTransform: 'uppercase'}}>Vijay</div>
        <div style={{fontSize: '12px', opacity: 0.5, marginTop: '0.5rem', letterSpacing: '0.2em'}}>FOUNDER, STUDIO THARI</div>
      </div>
    </section>

    {/* PRICING PREVIEW */}
    <section>
      <div className="line-mask"><div className="sec-label">Investment</div></div>
      <div className="line-mask"><h2>Tier-1</h2></div>
      <div className="line-mask"><h2>Engagements.</h2></div>
      <div style={{marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)'}}>
        {[
          { n: 'Strategy', p: '₹75k' },
          { n: 'Growth Partner', p: '₹150k', f: true },
          { n: 'Enterprise', p: 'Custom' }
        ].map((p, i) => (
          <div key={i} className="reveal" style={{padding: '6rem 3rem', background: 'var(--bg)', border: p.f ? '2px solid var(--text)' : 'none'}}>
            <h3 style={{fontSize: '28px', fontWeight: '900', textTransform: 'uppercase'}}>{p.n}</h3>
            <div style={{fontSize: '56px', fontWeight: '900', margin: '2rem 0'}}>{p.p}</div>
            <button style={{width: '100%', padding: '20px', background: p.f ? 'var(--text)' : 'transparent', color: p.f ? 'var(--bg)' : 'var(--text)', border: '1px solid var(--text)', fontWeight: '900'}}>REQUEST PROPOSAL</button>
          </div>
        ))}
      </div>
    </section>

    {/* FINAL CTA */}
    <section id="cta" style={{textAlign: 'center', padding: '15rem 10%'}}>
      <div className="line-mask"><div className="sec-label">The Future</div></div>
      <div className="line-mask"><h2 style={{fontSize: 'clamp(50px, 12vw, 200px)'}}>Let's</h2></div>
      <div className="line-mask"><h2 style={{fontSize: 'clamp(50px, 12vw, 200px)'}}>Scale.</h2></div>
      <Link to="/contact" className="nav-cta reveal hero-cta">Book Free Growth Audit</Link>
    </section>
  </main>
)

const Services = () => (
  <main style={{paddingTop: '20vh'}}>
    <section>
      <div className="line-mask"><div className="sec-label">Our Expertise</div></div>
      <div className="line-mask"><h2>Full-Spectrum</h2></div>
      <div className="line-mask"><h2>Engineering.</h2></div>
      <div style={{marginTop: '6rem'}}>
        {[
          { n: 'Shopify Architecture', d: 'Conversion-centric Liquid & Hydrogen development.' },
          { n: 'Brand Identity', d: 'Visual systems and category positioning.' },
          { n: 'Interactive 3D', d: 'High-end WebGL and immersive interfaces.' },
          { n: 'Growth Engineering', d: 'Performance ads and automated funnel scaling.' }
        ].map((s, i) => (
          <div key={i} className="reveal" style={{padding: '5rem 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h3 style={{fontSize: '56px', fontWeight: '900', textTransform: 'uppercase'}}>{s.n}</h3>
              <p style={{marginTop: '1rem', color: 'var(--muted)', fontSize: '16px'}}>{s.d}</p>
            </div>
            <ArrowUpRight size={40} />
          </div>
        ))}
      </div>
    </section>
  </main>
)

const Work = () => (
  <main style={{paddingTop: '20vh'}}>
    <section>
      <div className="line-mask"><div className="sec-label">Selected Impact</div></div>
      <div className="line-mask"><h2>Recent</h2></div>
      <div className="line-mask"><h2>Deployments.</h2></div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginTop: '6rem'}}>
        {[
          { t: 'Studio Thari', c: 'Luxury Ethnic Wear', n: '01', img: '/assets/studiothari.png' },
          { t: 'Sieben Tech', c: 'Premium Audio & Earbuds', n: '02', img: '/assets/sieben.png' },
          { t: 'Yuko', c: 'SaaS Ecosystem', n: '03', img: '/assets/yuko.png' },
          { t: 'Gharana India', c: 'Heritage Fashion', n: '04', img: '/assets/gharana.png' }
        ].map((w, i) => (
          <div key={i} className="work-card reveal">
            <div style={{height: '600px', background: `url(${w.img}) center/cover no-repeat`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'}}>
               <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)'}}></div>
               <span style={{fontSize: '150px', fontWeight: '900', opacity: 0.1, position: 'relative', zIndex: 1}}>{w.n}</span>
            </div>
            <div style={{padding: '2.5rem 0'}}>
              <h4 style={{fontSize: '32px', fontWeight: '900', textTransform: 'uppercase'}}>{w.t}</h4>
              <p style={{fontSize: '12px', color: 'var(--muted)', marginTop: '0.8rem', letterSpacing: '0.2em'}}>{w.c}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
)

const Pricing = () => (
  <main style={{paddingTop: '20vh'}}>
    <section>
      <div className="line-mask"><div className="sec-label">Investment</div></div>
      <div className="line-mask"><h2>Strategic</h2></div>
      <div className="line-mask"><h2>Partnership.</h2></div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', marginTop: '6rem'}}>
        {[
          { n: 'Strategy', p: '₹75k' },
          { n: 'Growth Partner', p: '₹150k', f: true },
          { n: 'Enterprise', p: 'Custom' }
        ].map((p, i) => (
          <div key={i} className="reveal" style={{padding: '8rem 4rem', background: 'var(--bg)', border: p.f ? '2px solid var(--text)' : 'none'}}>
            <h3 style={{fontSize: '40px', fontWeight: '900', textTransform: 'uppercase'}}>{p.n}</h3>
            <div style={{fontSize: '80px', fontWeight: '900', margin: '3rem 0'}}>{p.p}</div>
            <button style={{width: '100%', padding: '24px', background: p.f ? 'var(--text)' : 'transparent', color: p.f ? 'var(--bg)' : 'var(--text)', border: '1px solid var(--text)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em'}}>Get Started</button>
          </div>
        ))}
      </div>
    </section>
  </main>
)

// ── MAIN APP COMPONENT ──
function AppContent() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    // GSAP ANIMATIONS
    const refreshAnimations = () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      
      const maskReveals = document.querySelectorAll('.line-mask > *')
      maskReveals.forEach((el) => {
        gsap.fromTo(el, { y: '105%' }, {
          y: 0, duration: 1.5, ease: 'expo.out',
          scrollTrigger: { trigger: el.parentElement, start: 'top 95%' }
        })
      })

      const opacityReveals = document.querySelectorAll('.reveal')
      opacityReveals.forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        })
      })
    }

    refreshAnimations()
    
    // REFRESH ON PAGE CHANGE
    window.scrollTo(0, 0)
    setTimeout(refreshAnimations, 100)

    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location])

  return (
    <>
      <div className="progress-bar" style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '2px', 
        background: 'var(--text)', zIndex: 3000, transformOrigin: 'left', scaleX: 0
      }} />
      
      <div className="canvas-container">
        <Scene theme={theme} />
      </div>
      
      <div className="cursor" id="custom-cursor" />

      <Navbar theme={theme} toggleTheme={toggleTheme} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Home />} /> {/* Temporary redirect */}
      </Routes>

      <footer style={{padding: '8rem 10%', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)', position: 'relative', zIndex: 10}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <img 
            src={theme === 'dark' ? "/assets/Group 1686556745.png" : "/assets/Group 1686556744.png"} 
            alt="FromZero" 
            style={{height: '32px', display: 'block'}} 
          />
        </div>
        <div style={{display: 'flex', gap: '5rem'}}>
          <a href="#" style={{fontSize: '12px', textDecoration: 'none', color: 'var(--muted)', fontWeight: '700'}}>TWITTER</a>
          <a href="#" style={{fontSize: '12px', textDecoration: 'none', color: 'var(--muted)', fontWeight: '700'}}>INSTAGRAM</a>
          <a href="#" style={{fontSize: '12px', textDecoration: 'none', color: 'var(--muted)', fontWeight: '700'}}>LINKEDIN</a>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
