'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Introduction
                </h2>
                <p className="leading-relaxed">
                  PHOTOSPHERE ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our educational platform.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Information We Collect
                </h2>
                <p className="leading-relaxed mb-3">
                  We collect the following types of information:
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li><strong>Account Information:</strong> When you create an account, we collect your name and email address.</li>
                  <li><strong>Usage Data:</strong> We collect information about how you interact with our platform, including simulation data, game progress, and learning activity.</li>
                  <li><strong>Local Storage:</strong> Your preferences (language, dark mode) and progress are stored locally in your browser.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  How We Use Your Information
                </h2>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>To provide and improve our educational services</li>
                  <li>To personalize your learning experience</li>
                  <li>To track your progress and achievements</li>
                  <li>To respond to your support requests</li>
                  <li>To send important updates about our platform</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Data Storage
                </h2>
                <p className="leading-relaxed">
                  Currently, your data is stored locally in your browser. We do not transmit your personal information to external servers unless you explicitly use features that require it (such as AI features with API keys). We are working on secure cloud storage options for future releases.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Third-Party Services
                </h2>
                <p className="leading-relaxed">
                  Our platform may integrate with third-party services (such as OpenAI for AI features). When you use these services, their privacy policies apply. We do not share your personal data with third parties without your consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Your Rights
                </h2>
                <p className="leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Access your personal data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of data collection (by using the platform without an account)</li>
                  <li>Contact us with privacy concerns</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Children's Privacy
                </h2>
                <p className="leading-relaxed">
                  PHOTOSPHERE is designed to be educational and safe for users of all ages. We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Changes to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <p className="font-semibold">Email: <a href="mailto:support@photosphere.app" className="text-green-600 dark:text-green-400 hover:underline">support@photosphere.app</a></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

