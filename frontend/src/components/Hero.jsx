import { useEffect, useRef, useState } from 'react'
import api from '../utils/api'

const phrases = ['Full-Stack Developer', 'React Specialist', 'Node.js Engineer', 'Problem Solver']

export default function Hero() {
  const canvasRef = useRef(null)
  const [typed, setTyped] = useState('')
  const [stats, setStats] = useState({ visitors: 142, project_views: 389, cv_downloads: 27 })

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, pts = [], raf

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      pts = Array.from({ length: 80 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5, op: Math.random() * 0.5 + 0.2
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.op})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // Typewriter
  useEffect(() => {
    let pi = 0, ci = 0, del = false, t
    const loop = () => {
      const word = phrases[pi]
      if (!del) { ci++; setTyped(word.slice(0, ci)); if (ci === word.length) { del = true; t = setTimeout(loop, 1800); return; } }
      else { ci--; setTyped(word.slice(0, ci)); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length } }
      t = setTimeout(loop, del ? 60 : 90)
    }
    t = setTimeout(loop, 500)
    return () => clearTimeout(t)
  }, [])

  // Counter animation
  const [counts, setCounts] = useState({ v: 0, p: 0, c: 0 })
  useEffect(() => {
    const targets = { v: stats.visitors, p: stats.project_views, c: stats.cv_downloads }
    const steps = 50
    let step = 0
    const t = setInterval(() => {
      step++
      setCounts({
        v: Math.round(targets.v * step / steps),
        p: Math.round(targets.p * step / steps),
        c: Math.round(targets.c * step / steps)
      })
      if (step >= steps) clearInterval(t)
    }, 30)
    return () => clearInterval(t)
  }, [stats])

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '120px 6% 80px', position: 'relative', overflow: 'hidden'
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)',
          letterSpacing: '0.12em', border: '1px solid rgba(0,212,255,0.3)',
          padding: '6px 14px', borderRadius: 2, marginBottom: '2rem',
          animation: 'fadeUp 0.8s 0.2s both'
        }}>
          <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
          Available for Work
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)',
          fontWeight: 800, lineHeight: 1.05, letterSpacing: -2,
          marginBottom: '0.5rem', animation: 'fadeUp 0.8s 0.4s both'
        }}>
          Omar<br /><span className="neon-text">Abdelaziz</span>
        </h1>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: 'var(--muted)', marginBottom: '1.5rem', letterSpacing: '0.02em',
          animation: 'fadeUp 0.8s 0.6s both', minHeight: '2em'
        }}>
          {typed}<span style={{ animation: 'blink 0.8s infinite', color: 'var(--accent)' }}>|</span>
        </div>

        <p style={{
          fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560,
          marginBottom: '2.5rem', animation: 'fadeUp 0.8s 0.8s both'
        }}>
          Full-Stack Developer crafting scalable web applications with React, Node.js, and MySQL. Based in Egypt, building the future of digital experiences.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeUp 0.8s 1s both' }}>
          <button className="btn-primary" onClick={() => scrollTo('projects')}>View My Work</button>
          <button className="btn-outline" onClick={() => scrollTo('contact')}>Get In Touch</button>
        </div>

        <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', animation: 'fadeUp 0.8s 1.2s both' }}>
          {[['visitors', counts.v, 'VISITORS'], ['project_views', counts.p, 'PROJECT VIEWS'], ['cv_downloads', counts.c, 'CV DOWNLOADS']].map(([k, n, lbl]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }} className="neon-text">{n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
