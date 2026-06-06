import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('portfolio_token')
    if (token) {
      axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setAdmin(res.data.admin))
        .catch(() => localStorage.removeItem('portfolio_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password })
    localStorage.setItem('portfolio_token', res.data.token)
    setAdmin(res.data.admin)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('portfolio_token')
    setAdmin(null)
  }

  const getToken = () => localStorage.getItem('portfolio_token')

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
