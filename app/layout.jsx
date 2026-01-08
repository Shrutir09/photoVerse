import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'
import { TranslationProvider } from './context/TranslationContext'
import NavbarWrapper from './components/NavbarWrapper'
import GlobalPhotoBotWrapper from './components/GlobalPhotoBotWrapper'

const inter = Inter({ subsets: ['latin'] })

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
            <GlobalPhotoBotWrapper />
          </TranslationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

