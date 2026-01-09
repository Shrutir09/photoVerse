'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext(null)

const API_BASE = '/api/auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false) // Start with false - don't block initial render
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client side after mount
    if (!mounted) return

    // Check for existing session - use cached user data first for faster initial render
    let cachedUser = null
    try {
      cachedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    } catch (e) {
      // localStorage not available
    }

    if (cachedUser) {
      try {
        const userData = JSON.parse(cachedUser)
        setUser(userData)
        // Verify token in background (non-blocking)
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (token) {
          // Verify in background without blocking
          fetch(`${API_BASE}/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
            .then(response => {
              if (response.ok) {
                return response.json()
              } else {
                throw new Error('Invalid token')
              }
            })
            .then(data => {
              setUser(data.user)
              if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(data.user))
              }
            })
            .catch(() => {
              // Token is invalid, clear it
              if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
              }
              setUser(null)
            })
        }
        return
      } catch (error) {
        // Invalid cached data, clear it
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }
      }
    }

    // No cached user, check token
    let token = null
    try {
      token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    } catch (e) {
      // localStorage not available
    }

    if (!token) {
      return
    }

    // Verify token in background
    setLoading(true)
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(data.user))
          }
        } else {
          // Token is invalid, clear it
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [mounted])

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        return { success: false, error: 'Server returned an invalid response. Please try again.' }
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Store token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      setUser(data.user)

      return { success: true, user: data.user }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'An unexpected error occurred. Please try again.' }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        return { success: false, error: 'Server returned an invalid response. Please try again.' }
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      // After signup, automatically log in
      const loginResult = await login(email, password)
      return loginResult
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: error.message || 'An unexpected error occurred. Please try again.' }
    }
  }

  const googleLogin = async (credential) => {
    try {
      const response = await fetch(`${API_BASE}/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        return { success: false, error: 'Server returned an invalid response. Please try again.' }
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Google authentication failed')
      }

      // Store token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      setUser(data.user)

      return { success: true, user: data.user }
    } catch (error) {
      console.error('Google login error:', error)
      return { success: false, error: error.message || 'Google authentication failed. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    router.push('/login')
  }

  const value = {
    user,
    login,
    signup,
    googleLogin,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

