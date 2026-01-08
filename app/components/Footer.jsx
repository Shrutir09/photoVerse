'use client'

import Link from 'next/link'
import Logo from './Logo'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function Footer() {
  const { language } = useTranslation()
  return (
    <footer className="mt-20 relative">
      {/* Top Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-chalk-border/15 dark:to-transparent mb-6" />

      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 dark:bg-chalkboard-navbar-footer border-t border-green-500/20 dark:border-t dark:border-chalk-border/10 text-white dark:text-chalk-white shadow-2xl dark:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          {/* First Row - Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-6">
            {/* Column 1: Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-3">
                <Logo size="lg" />
                <span className="text-2xl md:text-3xl font-bold text-white dark:text-chalk-white">PHOTOSPHERE</span>
              </div>
              <p className="text-green-100 dark:text-chalk-secondary text-sm font-medium leading-tight">
                {t('footer.tagline', language)}
              </p>
              <p className="text-green-200 dark:text-chalk-secondary/70 text-xs leading-tight">
                {t('footer.description', language)}
              </p>
              <a
                href="https://github.com/Shrutir09/photoVerse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-chalkboard-surface/30 hover:bg-white/30 dark:hover:bg-chalkboard-surface/40 border border-white/30 dark:border-chalk-border/20 rounded-lg transition-all group mt-2 cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Visit Photoverse GitHub repository"
              >
                <svg className="w-4 h-4 text-white dark:text-chalk-secondary group-hover:text-green-200 dark:group-hover:text-chalk-emerald transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-white dark:text-chalk-secondary group-hover:text-green-200 dark:group-hover:text-chalk-emerald transition-colors">GitHub</span>
              </a>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-semibold text-base mb-3 text-white dark:text-chalk-white">{t('footer.quickLinks', language)}</h3>
              <ul className="space-y-2">
                {[
                  { href: '/', labelKey: 'navbar.home', icon: '🏠', prefetch: false },
                  { href: '/learn', labelKey: 'footer.learningCenter', icon: '📚', prefetch: true },
                  { href: '/games', labelKey: 'footer.educationalGames', icon: '🎮', prefetch: true },
                  { href: '/charts', labelKey: 'footer.dataCharts', icon: '📊', prefetch: true },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={link.prefetch}
                      className="text-green-100 dark:text-chalk-secondary hover:text-white dark:hover:text-chalk-white transition-colors duration-200 group flex items-center gap-2 text-sm"
                    >
                      <span className="text-base opacity-80 dark:opacity-70">{link.icon}</span>
                      <span className="relative">
                        {t(link.labelKey, language)}
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-px bg-green-400 dark:bg-chalk-border/40 group-hover:w-full transition-all duration-300"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h3 className="font-semibold text-base mb-3 text-white dark:text-chalk-white">{t('footer.resources', language)}</h3>
              <ul className="space-y-2">
                {[
                  { href: '/about', labelKey: 'footer.aboutUs', icon: 'ℹ️', prefetch: true },
                  { href: '/help', labelKey: 'footer.helpSupport', icon: '❓', prefetch: true },
                  { href: '/privacy', labelKey: 'footer.privacyPolicy', icon: '🔒', prefetch: true },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={link.prefetch}
                      className="text-green-100 dark:text-chalk-secondary hover:text-white dark:hover:text-chalk-white transition-colors duration-200 group flex items-center gap-2 text-sm"
                    >
                      <span className="text-base opacity-80 dark:opacity-70">{link.icon}</span>
                      <span className="relative">
                        {t(link.labelKey, language)}
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-px bg-green-400 dark:bg-chalk-border/40 group-hover:w-full transition-all duration-300"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Socials */}
            <div>
              <h3 className="font-semibold text-base mb-3 text-white dark:text-chalk-white">{t('footer.contactUs', language)}</h3>
              <div className="space-y-2 mb-4">
                <a
                  href="mailto:support@photosphere.app"
                  className="flex items-center gap-2 text-green-100 dark:text-chalk-secondary hover:text-white dark:hover:text-chalk-white transition-colors duration-200 group text-sm"
                >
                  <span className="text-lg opacity-80 dark:opacity-70">📧</span>
                  <span className="relative">
                    support@photosphere.app
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-green-400 dark:bg-chalk-border/40 group-hover:w-full transition-all duration-300"
                    />
                  </span>
                </a>
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-2 text-green-100 dark:text-chalk-secondary hover:text-white dark:hover:text-chalk-white transition-colors duration-200 group text-sm"
                >
                  <span className="text-lg opacity-80 dark:opacity-70">📞</span>
                  <span className="relative">
                    +91-XXXXXXXXXX
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-green-400 dark:bg-chalk-border/40 group-hover:w-full transition-all duration-300"
                    />
                  </span>
                </a>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-medium text-sm mb-2 text-white dark:text-chalk-white">{t('footer.followUs', language)}</h4>
                <div className="flex flex-wrap gap-3">
                  {/* Facebook */}
                  <motion.a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 dark:bg-chalkboard-surface/40 dark:border dark:border-chalk-border/20 hover:bg-blue-600/80 dark:hover:bg-chalkboard-surface/50 flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 text-white dark:text-chalk-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </motion.a>

                  {/* Twitter/X */}
                  <motion.a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 dark:bg-chalkboard-surface/40 dark:border dark:border-chalk-border/20 hover:bg-gray-800 dark:hover:bg-chalkboard-surface/50 flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    title="Twitter"
                  >
                    <svg className="w-4 h-4 text-white dark:text-chalk-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>

                  {/* Instagram */}
                  <motion.a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 dark:bg-chalkboard-surface/40 dark:border dark:border-chalk-border/20 hover:bg-gradient-to-br hover:from-purple-600/80 hover:via-pink-600/80 hover:to-orange-500/80 dark:hover:bg-chalkboard-surface/50 flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 text-white dark:text-chalk-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.a>

                  {/* Discord */}
                  <motion.a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 dark:bg-chalkboard-surface/40 dark:border dark:border-chalk-border/20 hover:bg-indigo-600/80 dark:hover:bg-chalkboard-surface/50 flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    title="Discord"
                  >
                    <svg className="w-4 h-4 text-white dark:text-chalk-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Second Row */}
          <div className="pt-4 border-t border-green-500/30 dark:border-t dark:border-chalk-border/15">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1">
              <p className="text-green-100 dark:text-chalk-secondary/60 text-xs text-center">
                © {new Date().getFullYear()} PHOTOSPHERE. {t('footer.allRightsReserved', language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
