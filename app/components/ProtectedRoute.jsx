'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Mark as mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only redirect after mount and when not loading
    if (!mounted || loading) return
    
    if (!isAuthenticated) {
      // Save the intended destination
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('redirectAfterLogin', pathname)
        } catch (e) {
          // localStorage not available
        }
      }
      router.push('/login')
    }
  }, [isAuthenticated, loading, router, pathname, mounted])

  // Don't show loading state - render children immediately
  // Auth check happens in background
  if (!mounted) {
    return <>{children}</>
  }

  // If not authenticated and not loading, return null (redirect will happen)
  if (!loading && !isAuthenticated) {
    return null
  }

  // Render children immediately - don't block on auth
  return <>{children}</>
}

