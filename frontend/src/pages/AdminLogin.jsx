import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '2rem'
    }}>
      <div style={{
        background: 'var(--card)', border: '0.5px solid var(--border)',
        borderRadius: 16, padding: '3rem', width: '100%', maxWidth: 420,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--neon)' }} />

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }} className="neon-text">OA.</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.12em', marginTop: '0.5rem' }}>ADMIN PORTAL</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[['email', 'Email Address', 'email'], ['password', 'Password', 'password']].map(([field, ph, type]) => (
            <div key={field}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>
                {field.toUpperCase()}
              </label>
              <input type={type} placeholder={ph} value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required
                style={{
                  width: '100%', background: 'var(--card2)', border: '0.5px solid var(--border)',
                  borderRadius: 8, padding: '12px 16px', fontSize: '0.9rem', color: 'var(--text)', outline: 'none'
                }} />
            </div>
          ))}

          {error && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ff5f57',
              padding: '10px 14px', background: 'rgba(255,95,87,0.1)', border: '1px solid rgba(255,95,87,0.3)', borderRadius: 6
            }}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={{
            marginTop: '0.5rem', padding: '14px', background: loading ? 'rgba(0,212,255,0.3)' : 'var(--neon)',
            border: 'none', borderRadius: 8, color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em'
          }}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>← Back to Portfolio</a>
        </div>
      </div>
    </div>
  )
}
