import { useEffect, useRef, useState } from 'react'
import api from '../utils/api'

// ─── About ───────────────────────────────────────────────────────────────────
export function About() {
  const ref = useRef(null)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    ref.current && o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section id="about" style={{ padding: '100px 6%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} ref={ref}>
        <div className="reveal" style={{
          background: 'var(--card)', border: '0.5px solid var(--border)',
          borderRadius: 12, padding: '2.5rem', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--neon)' }} />
          <div style={{
            display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            padding: '4px 12px', border: '1px solid rgba(124,58,237,0.4)',
            color: 'var(--accent2)', borderRadius: 2, marginBottom: '1.5rem', letterSpacing: '0.1em'
          }}>// ABOUT ME</div>

          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
            I'm a passionate Full-Stack Developer from Egypt, studying Software Development at WE School for Applied Technology. I specialize in building end-to-end web solutions — from sleek React frontends to robust Node.js backends.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.8rem' }}>
            I love turning complex problems into clean, elegant code. Whether it's a real-time dashboard, a secure API, or a beautiful UI — I bring full-stack thinking to every project.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['LOCATION', 'Egypt 🇪🇬'], ['EDUCATION', 'WE School for Applied Technology'], ['SPECIALITY', 'Full-Stack Development'], ['STATUS', '● Available']].map(([lbl, val]) => (
              <div key={lbl}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>{lbl}</div>
                <div style={{ fontSize: '0.88rem', marginTop: 2, color: lbl === 'STATUS' ? '#28ca41' : 'var(--text)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%', paddingBottom: '100%', position: 'relative',
            background: 'var(--card2)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: '6rem', fontWeight: 800
            }} className="neon-text">OA</div>
          </div>
          {[['React ⚛', { top: '10%', right: '-8%' }, 0], ['Node.js 🟢', { bottom: '20%', left: '-10%' }, 0.8], ['MySQL 🗄', { top: '55%', right: '-12%' }, 1.5]].map(([text, pos, delay]) => (
            <div key={text} style={{
              position: 'absolute', ...pos,
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '6px 14px',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 4, color: 'var(--accent)', letterSpacing: '0.08em',
              animation: `float 3s ease-in-out ${delay}s infinite`
            }}>{text}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Timeline ────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2022', title: 'Started Software Development', org: 'WE School for Applied Technology', desc: 'Began formal education in software development, learning fundamentals of web technologies, databases, and programming principles.' },
  { year: '2023', title: 'First Full-Stack Projects', org: 'Self-Directed Learning', desc: 'Built Tourism in Egypt and Quiz Tournament System, mastering PHP, MySQL, and JavaScript. Developed end-to-end architecture skills.' },
  { year: '2024', title: 'React & Node.js Expertise', org: 'Advanced Projects', desc: 'Developed the Harafi Platform and Smart Voting System. Expanded to React, Node.js, JWT Authentication, and embedded systems.' },
  { year: '2025 →', title: 'Junior Full-Stack Developer', org: 'Open to Opportunities', desc: 'Delivering production-ready full-stack applications. Seeking roles to contribute to innovative products and continue growing.' }
]

export function Timeline() {
  return (
    <section id="timeline" style={{ padding: '100px 6%', background: 'var(--card2)' }}>
      <div className="section-tag">// 04 — JOURNEY</div>
      <h2 className="section-title">Developer Journey</h2>
      <div className="section-line" />
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        <div style={{ position: 'absolute', left: 0, top: 8, bottom: 0, width: 1, background: 'var(--border)' }} />
        {TIMELINE.map((item, i) => (
          <div key={i} style={{ position: 'relative', paddingBottom: '3rem', paddingLeft: '2rem' }}>
            <div style={{
              position: 'absolute', left: '-2.45rem', top: 6,
              width: 10, height: 10, borderRadius: '50%',
              background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)'
            }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{item.year}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{item.org}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, maxWidth: 600 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  { label: 'Your experience?', msg: 'Tell me about your experience' },
  { label: 'Available for work?', msg: 'Are you available for work?' },
  { label: 'Tech stack?', msg: 'What is your tech stack?' }
]

const CHAT_REPLIES = {
  experience: "I have 3+ years of experience building full-stack apps with React, Node.js, PHP, and MySQL — 6 major projects ranging from platforms to embedded systems! 🚀",
  available: "Yes! I'm open to full-time roles, internships, and freelance projects. Let's connect! 🚀",
  stack: "Main stack: React + Node.js/Express + MySQL, with JWT auth. Also PHP, MongoDB, Bootstrap, and Tailwind. Full-stack all the way! ⚡",
  default: "Thanks for your message! I'll get back to you soon at omarabdelaziz4673@gmail.com 📧"
}

export function Contact() {
  const [messages, setMessages] = useState([{ text: "Hey there! 👋 I'm Omar, a Full-Stack Developer from Egypt. How can I help you?", type: 'recv' }])
  const [input, setInput] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const chatRef = useRef(null)

  const getReply = msg => {
    const m = msg.toLowerCase()
    if (m.includes('experience') || m.includes('background')) return CHAT_REPLIES.experience
    if (m.includes('available') || m.includes('work') || m.includes('hire')) return CHAT_REPLIES.available
    if (m.includes('tech') || m.includes('stack') || m.includes('language')) return CHAT_REPLIES.stack
    return CHAT_REPLIES.default
  }

  const sendMsg = (text) => {
    if (!text.trim()) return
    setMessages(m => [...m, { text, type: 'sent' }])
    setInput('')
    setTimeout(() => {
      setMessages(m => [...m, { text: getReply(text), type: 'recv' }])
    }, 1000)
  }

  useEffect(() => { chatRef.current && (chatRef.current.scrollTop = chatRef.current.scrollHeight) }, [messages])

  const submitForm = async e => {
    e.preventDefault()
    try {
      await api.post('/contact', form)
      setStatus('✓ Message sent! Omar will reply soon.')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('Failed to send. Email omarabdelaziz4673@gmail.com directly.')
    }
  }

  return (
    <section id="contact" style={{ padding: '100px 6%', background: 'var(--card2)' }}>
      <div className="section-tag">// 05 — CONNECT</div>
      <h2 className="section-title">Get In Touch</h2>
      <div className="section-line" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        {/* Chat UI */}
        <div style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: 'var(--neon)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#fff'
            }}>OA</div>
            <div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Omar Abdelaziz</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#28ca41' }}>● Online</div>
            </div>
          </div>

          <div ref={chatRef} style={{ padding: '1.25rem', minHeight: 240, maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                maxWidth: '78%', fontSize: '0.85rem', lineHeight: 1.5, padding: '10px 14px', borderRadius: 12,
                alignSelf: m.type === 'sent' ? 'flex-end' : 'flex-start',
                background: m.type === 'sent' ? 'rgba(0,212,255,0.12)' : 'var(--card2)',
                border: `1px solid ${m.type === 'sent' ? 'rgba(0,212,255,0.25)' : 'var(--border)'}`,
                color: m.type === 'sent' ? 'var(--accent)' : 'var(--text)'
              }}>{m.text}</div>
            ))}
          </div>

          <div style={{ padding: '0 1.25rem 0.75rem', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {QUICK_REPLIES.map(qr => (
              <button key={qr.label} onClick={() => sendMsg(qr.msg)} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem', padding: '5px 12px',
                border: '1px solid var(--border)', color: 'var(--muted)', background: 'transparent',
                borderRadius: 3, transition: 'all 0.2s', letterSpacing: '0.05em'
              }}>{qr.label}</button>
            ))}
          </div>

          <div style={{ padding: '0 1.25rem 1rem', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg(input)}
              placeholder="Type a message..."
              style={{ flex: 1, background: 'var(--card2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '8px 14px', fontSize: '0.85rem', color: 'var(--text)', outline: 'none' }} />
            <button onClick={() => sendMsg(input)} style={{
              padding: '8px 16px', background: 'var(--neon)', border: 'none', borderRadius: 8,
              color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700
            }}>→</button>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Let's build something amazing together.
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
          </p>

          <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[['name', 'Your Name', 'text'], ['email', 'Your Email', 'email']].map(([field, ph, type]) => (
              <input key={field} type={type} placeholder={ph} value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required
                style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '12px 16px', fontSize: '0.9rem', color: 'var(--text)', outline: 'none' }} />
            ))}
            <textarea rows={4} placeholder="Your Message" value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
              style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '12px 16px', fontSize: '0.9rem', color: 'var(--text)', outline: 'none', resize: 'vertical' }} />
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message →</button>
            {status && <div style={{ color: status.startsWith('✓') ? '#28ca41' : '#ff5f57', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{status}</div>}
          </form>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[['📧', 'EMAIL', 'omarabdelaziz4673@gmail.com', 'mailto:omarabdelaziz4673@gmail.com'],
              ['⚡', 'GITHUB', 'github.com/OMARABDELAZIZ1', 'https://github.com/OMARABDELAZIZ1'],
              ['💼', 'LINKEDIN', 'linkedin.com/in/omarabdelaziz', 'https://linkedin.com/in/omarabdelaziz']].map(([icon, label, val, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem',
                background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 8,
                transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>{label}</div>
                  <div style={{ fontSize: '0.85rem' }}>{val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
