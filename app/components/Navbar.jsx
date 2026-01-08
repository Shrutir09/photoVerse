'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function Navbar({ darkMode, onDarkModeToggle }) {
  const { language, setLanguage } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileMenu && !e.target.closest('.profile-menu')) {
        setShowProfileMenu(false)
      }
      if (showMobileMenu && !e.target.closest('.mobile-menu')) {
        setShowMobileMenu(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [showProfileMenu, showMobileMenu])

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false)
  }, [pathname])

  const navItems = [
    { href: '/', labelKey: 'navbar.home', icon: '🏠' },
    { href: '/learn', labelKey: 'navbar.learn', icon: '📚' },
    { href: '/games', labelKey: 'navbar.games', icon: '🎮' },
    { href: '/charts', labelKey: 'navbar.charts', icon: '📊' },
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled
          ? 'glass border-b border-green-500/20 shadow-lg backdrop-blur-xl bg-green-800/90 dark:bg-chalkboard-navbar-footer dark:border-chalk-border'
          : 'glass backdrop-blur-xl bg-green-800/80 dark:bg-chalkboard-navbar-footer dark:border-chalk-border/10 border-b border-green-500/10'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3-Section Flex Layout: LEFT | CENTER | RIGHT */}
      <div className="flex items-center h-16 md:h-20 w-full">
        {/* LEFT SECTION - Logo flush left with 16px padding */}
        <div className="flex items-center pl-4 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <Logo size="md" />
            <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-emerald-400 transition-all">
              <span className="hidden sm:inline">PHOTOSPHERE</span>
              <span className="sm:hidden">PHOTO</span>
            </span>
          </Link>
        </div>

        {/* CENTER SECTION - Navigation links perfectly centered */}
        <div className="flex-1 flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-semibold transition-all relative ${
                  isActive(item.href)
                    ? 'text-green-500 bg-green-500/10 dark:text-chalk-emerald dark:bg-chalk-emerald/10'
                    : 'text-gray-700 dark:text-chalk-secondary hover:text-green-500 dark:hover:text-chalk-emerald hover:bg-green-500/5 dark:hover:bg-chalk-emerald/10'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {t(item.labelKey, language)}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full"
                    layoutId="navbar-indicator"
                  />
                )}
                {!isActive(item.href) && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-green-500/0 hover:bg-green-500/10 transition-colors"
                    whileHover={{ opacity: 1 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - Profile, theme toggle, username flush right with 16px padding */}
        <div className="flex items-center pr-4 flex-shrink-0 gap-4">
          {/* Desktop: Language, Dark Mode, Profile */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            
            <motion.button
              onClick={onDarkModeToggle}
              className="glass rounded-full p-2 text-lg hover:bg-green-500/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              title={darkMode ? t('navbar.switchToLight', language) : t('navbar.switchToDark', language)}
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>

            {/* Profile */}
            {user ? (
                <div className="relative profile-menu">
                  <motion.button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 glass rounded-full px-2.5 py-1.5 hover:bg-green-500/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-lg ring-2 ring-green-500/20">
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden lg:block font-semibold text-sm text-gray-700 dark:text-chalk-white">
                      {user.name || 'User'}
                    </span>
                  </motion.button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 glass rounded-2xl p-4 shadow-2xl border-2 border-green-500/30 backdrop-blur-xl"
                    >
                      {/* User Header */}
                      <div className="flex items-center gap-4 p-4 mb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-green-500/30">
                          {user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white text-lg truncate">
                            {user.name || 'User'}
                          </div>
                          <div className="text-sm text-green-100">
                            {user.email || 'user@example.com'}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="text-xs bg-green-500/20 px-2 py-1 rounded-full text-green-100">
                              Level {user.level || 1}
                            </div>
                            <div className="text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-100">
                              {user.points || 0} pts
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <span className="text-2xl">👤</span>
                          <div className="flex-1">
                            <div className="font-semibold text-white group-hover:text-green-300 transition-colors">
                              {t('navbar.profile', language)}
                            </div>
                            <div className="text-xs text-green-100">
                              {t('navbar.viewStats', language)}
                            </div>
                          </div>
                          <span className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>

                        <Link
                          href="/badges"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <span className="text-2xl">🏆</span>
                          <div className="flex-1">
                            <div className="font-semibold text-white group-hover:text-green-300 transition-colors">
                              {t('navbar.badges', language)}
                            </div>
                            <div className="text-xs text-green-100">
                              {(user.badges || []).length} {t('navbar.unlocked', language)}
                            </div>
                          </div>
                          <span className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>

                        <Link
                          href="/leaderboard"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <span className="text-2xl">📊</span>
                          <div className="flex-1">
                            <div className="font-semibold text-white group-hover:text-green-300 transition-colors">
                              {t('navbar.leaderboard', language)}
                            </div>
                            <div className="text-xs text-green-100">
                              {t('navbar.seeRankings', language)}
                            </div>
                          </div>
                          <span className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-green-500/20 my-3" />

                      {/* Logout */}
                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          logout()
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all group"
                      >
                        <span className="text-2xl">🚪</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-red-400 group-hover:text-red-300 transition-colors">
                            {t('navbar.logout', language)}
                          </div>
                          <div className="text-xs text-red-300/70">
                            {t('navbar.signOut', language)}
                          </div>
                        </div>
                        <span className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 text-sm"
              >
                {t('navbar.login', language)}
              </Link>
            )}
          </div>

          {/* Mobile: Language, Dark Mode Toggle, Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            <motion.button
              onClick={onDarkModeToggle}
              className="glass rounded-full p-2 text-lg hover:bg-green-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={darkMode ? t('navbar.switchToLight', language) : t('navbar.switchToDark', language)}
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="glass rounded-lg p-2 hover:bg-green-500/10 transition-colors mobile-menu"
              whileTap={{ scale: 0.9 }}
              aria-label={t('navbar.toggleMenu', language)}
            >
              <motion.div
                animate={{ rotate: showMobileMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl"
              >
                {showMobileMenu ? '✕' : '☰'}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-green-500/20 mobile-menu w-full"
            >
              <div className="px-4 py-4 space-y-2 w-full">
                {/* Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(item.href)
                        ? 'bg-green-500/10 text-green-500 border-2 border-green-500/30 dark:bg-chalk-emerald/10 dark:text-chalk-emerald dark:border-chalk-emerald/30'
                        : 'text-gray-700 dark:text-chalk-secondary hover:bg-green-500/5 dark:hover:bg-chalk-emerald/10'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold">{t(item.labelKey, language)}</span>
                    {isActive(item.href) && (
                      <span className="ml-auto text-green-500">●</span>
                    )}
                  </Link>
                ))}

                {/* Profile Section (Mobile) */}
                {user ? (
                  <>
                    <div className="border-t border-green-500/20 my-3" />
                    <Link
                      href="/profile"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {user.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-700 dark:text-chalk-white">
                            {user.name || 'User'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-chalk-secondary">
                            {t('navbar.viewProfile', language)}
                          </div>
                        </div>
                        <span className="text-gray-400 dark:text-chalk-secondary">→</span>
                    </Link>
                    <Link
                      href="/badges"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all"
                    >
                      <span className="text-2xl">🏆</span>
                      <span className="font-semibold text-gray-700 dark:text-chalk-white">{t('navbar.badges', language)}</span>
                      <span className="ml-auto text-gray-400 dark:text-chalk-secondary">→</span>
                    </Link>
                    <Link
                      href="/leaderboard"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all"
                    >
                      <span className="text-2xl">📊</span>
                      <span className="font-semibold text-gray-700 dark:text-chalk-white">{t('navbar.leaderboard', language)}</span>
                      <span className="ml-auto text-gray-400 dark:text-chalk-secondary">→</span>
                    </Link>
                    <div className="border-t border-green-500/20 my-3" />
                    <button
                      onClick={() => {
                        setShowMobileMenu(false)
                        logout()
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-red-500"
                    >
                      <span className="text-2xl">🚪</span>
                      <span className="font-semibold">{t('navbar.logout', language)}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="border-t border-green-500/20 my-3" />
                    <Link
                      href="/login"
                      onClick={() => setShowMobileMenu(false)}
                      className="block w-full text-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                    >
                      {t('navbar.login', language)}
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.nav>
  )
}
