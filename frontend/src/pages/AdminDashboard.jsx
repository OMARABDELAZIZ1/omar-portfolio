import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

const TABS = ['Overview', 'Projects', 'Messages', 'CV']

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Overview')
  const [stats, setStats] = useState(null)
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/stats').then(r => setStats(r.data.data)),
      api.get('/projects').then(r => setProjects(r.data.data)),
      api.get('/contact').then(r => setContacts(r.data.data))
    ]).catch(console.error).finally(() => setLoading(false))
  }, [])

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Dashboard Nav */}
      <nav style={{
        padding: '0 6%', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 64,
        background: 'var(--card)', borderBottom: '0.5px solid var(--border)'
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800 }} className="neon-text">OA. Admin</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '6px 16px',
              border: `1px solid ${tab === t ? 'var(--accent)' : 'var(--border)'}`,
              background: tab === t ? 'rgba(0,212,255,0.07)' : 'transparent',
              color: tab === t ? 'var(--accent)' : 'var(--muted)', borderRadius: 4
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>{admin?.email}</span>
          <button onClick={handleLogout} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem', padding: '6px 14px',
            border: '1px solid rgba(255,95,87,0.4)', color: '#ff5f57', background: 'transparent', borderRadius: 4
          }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '3rem 6%' }}>
        {loading ? (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>Loading...</div>
        ) : (
          <>
            {tab === 'Overview' && <Overview stats={stats} projects={projects} contacts={contacts} />}
            {tab === 'Projects' && <ProjectsCRUD projects={projects} setProjects={setProjects} />}
            {tab === 'Messages' && <Messages contacts={contacts} />}
            {tab === 'CV' && <CVManager />}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview({ stats, projects, contacts }) {
  const cards = [
    ['Visitors', stats?.visitors ?? 142, '👁'],
    ['Project Views', stats?.project_views ?? 389, '📊'],
    ['CV Views', stats?.cv_views ?? 0, '👁'],
    ['CV Downloads', stats?.cv_downloads ?? 27, '📄'],
    ['Total Projects', stats?.total_projects ?? projects.length, '⚡'],
    ['Messages', stats?.total_contacts ?? contacts.length, '💬']
  ]

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        {cards.map(([label, val, icon]) => (
          <div key={label} style={{
            background: 'var(--card)', border: '0.5px solid var(--border)',
            borderRadius: 12, padding: '1.5rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.4rem', opacity: 0.3 }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{label.toUpperCase()}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }} className="neon-text">{val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Projects</h3>
          {projects.slice(0, 4).map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '0.5px solid var(--border)' }}>
              <span style={{ fontSize: '0.88rem' }}>{p.title}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent2)', padding: '2px 8px', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 2 }}>{p.category}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Messages</h3>
          {contacts.slice(0, 4).map((c, i) => (
            <div key={i} style={{ padding: '0.6rem 0', borderBottom: '0.5px solid var(--border)' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2 }}>{c.email}</div>
            </div>
          ))}
          {contacts.length === 0 && <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>No messages yet.</div>}
        </div>
      </div>
    </div>
  )
}

// ─── CV Manager ───────────────────────────────────────────────────────────────
function CVManager() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('cv', file)

    setUploading(true)
    setMessage('')
    try {
      await api.post('/cv/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage('✅ CV updated successfully!')
      setFile(null)
    } catch (err) {
      setMessage('❌ Failed to upload CV. Make sure it is a PDF.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>CV Management</h2>
      <div style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '2rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
          Upload your latest CV in PDF format. This will replace the existing one and will be available for preview and download on your portfolio.
        </p>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".pdf"
            onChange={e => setFile(e.target.files[0])}
            style={{ marginBottom: '1rem', display: 'block', fontSize: '0.85rem' }}
          />
          <button
            type="submit"
            disabled={!file || uploading}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.8rem' }}
          >
            {uploading ? 'Uploading...' : 'Upload CV'}
          </button>
        </form>
        {message && (
          <div style={{
            marginTop: '1.5rem', padding: '10px', borderRadius: 6,
            fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)'
          }}>
            {message}
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <a href="/api/cv/preview" target="_blank" className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>Current CV Preview ↗</a>
      </div>
    </div>
  )
}

// ─── Projects CRUD ────────────────────────────────────────────────────────────
function ProjectsCRUD({ projects, setProjects }) {
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ title: '', category: 'Web', description: '', tech_stack: '', live_url: '', github_url: '', featured: false })
  const [saving, setSaving] = useState(false)

  const openNew = () => { setForm({ title: '', category: 'Web', description: '', tech_stack: '', live_url: '', github_url: '', featured: false }); setModal('new') }
  const openEdit = p => { setForm({ ...p, featured: !!p.featured }); setModal('edit') }

  const save = async () => {
    setSaving(true)
    try {
      if (modal === 'new') {
        const r = await api.post('/projects', form)
        setProjects(prev => [r.data.data, ...prev])
      } else {
        const r = await api.put(`/projects/${form.id}`, form)
        setProjects(prev => prev.map(p => p.id === form.id ? r.data.data : p))
      }
      setModal(null)
    } catch (err) { alert('Failed to save project') }
    finally { setSaving(false) }
  }

  const del = async id => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800 }}>Projects</h2>
        <button onClick={openNew} className="btn-primary" style={{ padding: '10px 24px' }}>+ New Project</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map(p => (
          <div key={p.id} style={{
            background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 10,
            padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>{p.title}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent2)' }}>{p.category}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{p.tech_stack?.split(',').slice(0,3).join(', ')}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => openEdit(p)} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '6px 14px', border: '1px solid var(--border)', color: 'var(--muted)', background: 'transparent', borderRadius: 4 }}>Edit</button>
              <button onClick={() => del(p.id)} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '6px 14px', border: '1px solid rgba(255,95,87,0.3)', color: '#ff5f57', background: 'transparent', borderRadius: 4 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,8,0.9)', zIndex: 8000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 16, padding: '2.5rem', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>{modal === 'new' ? 'New Project' : 'Edit Project'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[['title', 'Title *'], ['tech_stack', 'Tech Stack (comma-separated)'], ['live_url', 'Live URL'], ['github_url', 'GitHub URL']].map(([field, ph]) => (
                <input key={field} placeholder={ph} value={form[field] || ''}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  style={{ background: 'var(--card2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: '0.88rem', color: 'var(--text)', outline: 'none' }} />
              ))}
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ background: 'var(--card2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: '0.88rem', color: 'var(--text)', outline: 'none' }}>
                {['Web', 'Backend', 'Embedded', 'API'].map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea rows={3} placeholder="Description" value={form.description || ''}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                style={{ background: 'var(--card2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: '0.88rem', color: 'var(--text)', outline: 'none', resize: 'vertical' }} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--muted)' }}>
                <input type="checkbox" checked={!!form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                Featured project
              </label>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: '1.5rem' }}>
              <button onClick={save} disabled={saving} className="btn-primary" style={{ padding: '10px 24px' }}>{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setModal(null)} className="btn-outline" style={{ padding: '10px 24px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Messages ─────────────────────────────────────────────────────────────────
function Messages({ contacts }) {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>Messages ({contacts.length})</h2>
      {contacts.length === 0 ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>No messages yet.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {contacts.map((c, i) => (
              <div key={i} onClick={() => setSelected(c)} style={{
                background: 'var(--card)', border: `0.5px solid ${selected === c ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 10, padding: '1rem 1.25rem', transition: 'border-color 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{c.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', marginBottom: 4 }}>{c.email}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</div>
              </div>
            ))}
          </div>
          {selected && (
            <div style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 10, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>{selected.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', marginTop: 2 }}>{selected.email}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '1.2rem' }}>✕</button>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7 }}>{selected.message}</p>
              <a href={`mailto:${selected.email}`} className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', padding: '10px 20px', fontSize: '0.72rem' }}>Reply via Email →</a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
