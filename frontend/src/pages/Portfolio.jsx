import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { About, Timeline, Contact } from '../components/Sections'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import api from '../utils/api'

export default function Portfolio() {
  // Track page view
  useEffect(() => {
    api.post('/stats/track', { event: 'page_view', metadata: { page: 'portfolio' } }).catch(() => {})
  }, [])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
      <footer style={{
        padding: '3rem 6%', borderTop: '0.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800 }} className="neon-text">Omar Abdelaziz.</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>© 2025 — Full-Stack Developer — Egypt</div>
      </footer>
    </>
  )
}
