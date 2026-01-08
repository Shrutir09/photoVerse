'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import ArticleCards from '../components/ArticleCards'
import AnimatedFormula from '../components/AnimatedFormula'
import PhotosynthesisProcess from '../components/PhotosynthesisProcess'
import ActivityCards from '../components/ActivityCards'
import Footer from '../components/Footer'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function LearnPage() {
  const { language } = useTranslation()

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 pb-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-4 md:mb-6">
              {t('learn.title', language)}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-chalk-secondary max-w-3xl mx-auto">
              {t('learn.subtitle', language)}
            </p>
          </div>

          {/* Section 1: Articles & Reading */}
          <section>
            <ArticleCards />
          </section>

          {/* Section 2: Animated Photosynthesis Formula */}
          <section>
            <AnimatedFormula />
          </section>

          {/* Section 3: Photosynthesis Process */}
          <section>
            <PhotosynthesisProcess />
          </section>

          {/* Section 4: Activities & Experiments */}
          <section>
            <ActivityCards />
          </section>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

