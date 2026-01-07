/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'plant-green': '#22c55e',
        'sun-yellow': '#fbbf24',
        'oxygen-blue': '#3b82f6',
        // Green Chalkboard Theme (Dark Mode)
        'chalkboard-bg': '#0F2E24',
        'chalkboard-surface': '#163D33',
        'chalkboard-navbar-footer': '#0C241D',
        'chalk-white': '#E6F5EE',
        'chalk-secondary': '#B7D9CB',
        'chalk-emerald': '#38E8B0',
        'chalk-yellow': '#F4D35E',
        'chalk-border': '#2F6F5A',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(251, 191, 36, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

