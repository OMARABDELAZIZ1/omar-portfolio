import { useState, useEffect } from 'react'
import api from '../utils/api'

const STATIC_PROJECTS = [
  { id: 1, title: 'Harafi Platform', category: 'Web', emoji: '🔧', description: 'Platform connecting users with craftsmen including electricians, mechanics, and carpenters. Features real-time booking, reviews, and location-based matching.', tech_stack: 'React, Node.js, MySQL, JWT', github_url: 'https://github.com/OMARABDELAZIZ1', live_url: '', features: ['User registration and craftsman profiles', 'Real-time booking and scheduling', 'JWT-secured API endpoints', 'Responsive React frontend'] },
  { id: 2, title: 'Tourism in Egypt', category: 'Web', emoji: '🏛', description: 'An electronic tourism platform promoting Egyptian tourist attractions with rich media and multilingual support.', tech_stack: 'HTML, CSS, JavaScript, PHP, MySQL', github_url: 'https://github.com/OMARABDELAZIZ1', live_url: '', features: ['Rich attraction database with multimedia', 'Interactive tour planning', 'PHP backend with MySQL', 'Multilingual content EN/AR'] },
  { id: 3, title: 'Quiz Tournament System', category: 'Web', emoji: '🏆', description: 'Event-based quiz competition system with real-time scoring, live leaderboards, and multi-round tournament management.', tech_stack: 'PHP, MySQL, JavaScript', github_url: 'https://github.com/OMARABDELAZIZ1', live_url: '', features: ['Multi-round tournament brackets', 'Real-time scoring', 'Admin question management', 'Live competition mode'] },
  { id: 4, title: 'Smart Voting System', category: 'Embedded', emoji: '🗳', description: 'Secure electronic voting using fingerprint biometric authentication integrated with a real-time web dashboard.', tech_stack: 'Arduino, Sensors, C++, Web Dashboard', github_url: 'https://github.com/OMARABDELAZIZ1', live_url: '', features: ['Fingerprint sensor authentication', 'Arduino microcontroller', 'Real-time results dashboard', 'Tamper-proof vote recording'] },
  { id: 5, title: 'Product Management System', category: 'Web', emoji: '📦', description: 'Full CRUD dashboard for managing products, inventory, and orders with role-based access control.', tech_stack: 'React, Node.js, MySQL', github_url: 'https://github.com/OMARABDELAZIZ1', live_url: '', features: ['Full CRUD operations', 'Role-based access', 'Inventory tracking', 'Sales analytics'] },
  { id: 6, title: 'Developer Portfolio', category: 'Web', emoji: '💻', description: 'This advanced personal portfolio with analytics, admin dashboard, API playground, and JWT authentication.', tech_stack: 'React, Node.js, Express, JWT, MySQL', github_url: 'https://github.com/OMARABDELAZIZ1', live_url: 'https://frontend-steps--stevaabdelaziz.replit.app', features: ['Admin dashboard with CRUD', 'JWT authentication', 'Analytics tracking', 'API Playground', 'Chat-style contact'] }
]

export default function Projects() {
  const [projects, setProjects] = useState(STATIC_PROJECTS)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/projects').then(r => {
      if (r.data.data?.length) {
        const merged = r.data.data.map((p, i) => ({
          ...p, emoji: STATIC_PROJECTS[i]?.emoji || '⚡',
          features: STATIC_PROJECTS.find(s => s.title === p.title)?.features || []
        }))
        setProjects(merged)
      }
    }).catch(() => {})
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" style={{ padding: '100px 6%' }}>
      <div className="section-tag">// 03 — PORTFOLIO</div>
      <h2 className="section-title">Featured Projects</h2>
      <div className="section-line" />

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {['all', 'Web', 'Backend', 'Embedded'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            padding: '6px 16px', border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
            background: 'transparent', color: filter === f ? 'var(--accent)' : 'var(--muted)',
            borderRadius: 2, transition: 'all 0.2s', letterSpacing: '0.06em'
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(p => (
          <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

function ProjectCard({ project: p, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card)', border: `0.5px solid ${hovered ? 'rgba(0,212,255,0.4)' : 'var(--border)'}`,
        borderRadius: 12, overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s'
      }}>
      <div style={{
        height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--card2)', position: 'relative', fontSize: '3.5rem'
      }}>
        <span style={{ opacity: 0.5 }}>{p.emoji}</span>
        <span style={{
          position: 'absolute', bottom: 12, right: 16,
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', opacity: 0.6
        }}>0{p.id}</span>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent2)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{p.category}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem' }}>{p.title}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.2rem' }}>{p.description?.slice(0, 100)}…</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.2rem' }}>
          {p.tech_stack?.split(',').slice(0, 3).map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '3px 10px',
              border: '1px solid rgba(124,58,237,0.3)', color: 'var(--accent2)', borderRadius: 2
            }}>{t.trim()}</span>
          ))}
        </div>
        <button style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '7px 14px',
          border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent',
          borderRadius: 3, letterSpacing: '0.05em', transition: 'all 0.2s'
        }}>Case Study →</button>
      </div>
    </div>
  )
}

function ProjectModal({ project: p, onClose }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(5,5,8,0.9)',
      zIndex: 8000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: 'var(--card)', border: '0.5px solid var(--border)',
        borderRadius: 16, padding: '2.5rem', maxWidth: 600, width: '90%',
        position: 'relative', maxHeight: '80vh', overflowY: 'auto'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
          border: 'none', color: 'var(--muted)', fontSize: '1.4rem', transition: 'color 0.2s'
        }}>✕</button>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{p.category}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>{p.title}</h3>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{p.description}</p>
        {p.features?.length > 0 && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {p.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>{f}
              </li>
            ))}
          </ul>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.tech_stack?.split(',').map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '3px 10px',
              border: '1px solid rgba(124,58,237,0.3)', color: 'var(--accent2)', borderRadius: 2
            }}>{t.trim()}</span>
          ))}
        </div>
        {p.github_url && (
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: 8 }}>
            <a href={p.github_url} target="_blank" rel="noreferrer" style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '8px 18px',
              border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 4
            }}>GitHub →</a>
            {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '8px 18px',
              border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 4
            }}>Live Demo</a>}
          </div>
        )}
      </div>
    </div>
  )
}
