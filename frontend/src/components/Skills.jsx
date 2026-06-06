import { useState, useEffect, useRef } from 'react'

const SKILLS = {
  Frontend: [['React', 85], ['JavaScript', 90], ['HTML/CSS', 95], ['Bootstrap', 92], ['Tailwind CSS', 80]],
  Backend: [['Node.js', 85], ['Express.js', 83], ['PHP', 90], ['REST APIs', 88]],
  Database: [['MySQL', 90], ['MongoDB', 70]],
  Tools: [['Git / GitHub', 85], ['Postman', 82], ['VS Code', 95]]
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Frontend')
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true) }, { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const switchTab = tab => { setAnimate(false); setActiveTab(tab); setTimeout(() => setAnimate(true), 50) }

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '100px 6%', background: 'var(--card2)' }}>
      <div className="section-tag">// 02 — EXPERTISE</div>
      <h2 className="section-title">Skills &amp; Technologies</h2>
      <div className="section-line" />

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {Object.keys(SKILLS).map(tab => (
          <button key={tab} onClick={() => switchTab(tab)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            padding: '8px 20px', border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--border)'}`,
            background: activeTab === tab ? 'rgba(0,212,255,0.07)' : 'transparent',
            color: activeTab === tab ? 'var(--accent)' : 'var(--muted)',
            borderRadius: 4, transition: 'all 0.2s', letterSpacing: '0.05em'
          }}>{tab}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {SKILLS[activeTab].map(([name, pct]) => (
          <div key={name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>{pct}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2,
                background: 'var(--neon)',
                width: animate ? `${pct}%` : '0%',
                transition: 'width 1s cubic-bezier(0.4,0,0.2,1)'
              }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
