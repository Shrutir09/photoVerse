import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { AuthProvider } from './context/AuthContext'
import { TranslationProvider } from './context/TranslationContext'
import dynamic from 'next/dynamic'

// Lazy load heavy components
const NavbarWrapper = dynamic(() => import('./components/NavbarWrapper'), {
  ssr: true,
})
const GlobalPhotoBotWrapper = dynamic(() => import('./components/GlobalPhotoBotWrapper'), {
  ssr: false, // PhotoBot doesn't need SSR
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Better font loading performance
  preload: true,
})

export const metadata = {
  title: 'PHOTOSPHERE - Where Sunlight Becomes Life',
  description: 'AI-Powered Photosynthesis & Environment Interaction Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <TranslationProvider>
            <NavbarWrapper />
            <div className="navbar-offset">
              {children}
            </div>
            <Suspense fallback={null}>
              <GlobalPhotoBotWrapper />
            </Suspense>
          </TranslationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

