'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = typeof window !== 'undefined' ? localStorage.getItem('redirectAfterLogin') || '/' : '/'
      if (typeof window !== 'undefined') {
        localStorage.removeItem('redirectAfterLogin')
      }
      router.push(redirect)
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        const redirect = typeof window !== 'undefined' ? localStorage.getItem('redirectAfterLogin') || '/' : '/'
        if (typeof window !== 'undefined') {
          localStorage.removeItem('redirectAfterLogin')
        }
        router.push(redirect)
      } else {
        setError(result.error || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
=======
  const handleGoogleSignIn = () => {
    if (!window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      setError('Google Sign In is not configured. Please contact support.')
      return
    }

    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: trigger sign in manually
          window.google.accounts.oauth2.initTokenClient({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            scope: 'email profile',
          }).requestAccessToken()
        }
      })
    } catch (error) {
      console.error('Error triggering Google Sign In:', error)
      setError('Failed to initiate Google Sign In. Please try again.')
    }
  }

>>>>>>> 2e5eb7d (WIP: local changes)
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌱
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-5xl opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ☀️
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-1/4 text-4xl opacity-20"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌿
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 md:p-12 w-full max-w-md relative z-10 border-2 border-green-500/20 shadow-2xl"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" />
          <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
            PHOTOSPHERE
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-green-600 dark:text-green-400 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

