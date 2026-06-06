import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      padding: '0 6%', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 68,
      background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '0.5px solid var(--border)' : 'none',
      transition: 'all 0.3s'
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800 }} className="neon-text">OA.</div>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        {['about', 'skills', 'projects', 'timeline', 'contact'].map(id => (
          <li key={id}>
            <button onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em',
              transition: 'color 0.2s', textTransform: 'lowercase'
            }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{id}</button>
          </li>
        ))}
      </ul>

      <Link to="/admin/login" style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        padding: '7px 18px', border: '1px solid var(--accent)',
        color: 'var(--accent)', borderRadius: 4, letterSpacing: '0.05em',
        transition: 'all 0.2s'
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >admin</Link>
    </nav>
  )
}
