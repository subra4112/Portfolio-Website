/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00B4D8', // Electric blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#8B5CF6', // Neon purple
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#111827', // Dark charcoal base
          950: '#0f172a',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-purple': 'glowPurple 2s ease-in-out infinite alternate',
        'glow-blue': 'glowBlue 2s ease-in-out infinite alternate',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
        'blink-caret': 'blinkCaret 0.75s step-end infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'cyber-glow': 'cyberGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6' },
          '100%': { boxShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6' },
        },
        glowPurple: {
          '0%': { boxShadow: '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 15px #8B5CF6' },
          '100%': { boxShadow: '0 0 10px #8B5CF6, 0 0 20px #8B5CF6, 0 0 30px #8B5CF6' },
        },
        glowBlue: {
          '0%': { boxShadow: '0 0 5px #00B4D8, 0 0 10px #00B4D8, 0 0 15px #00B4D8' },
          '100%': { boxShadow: '0 0 10px #00B4D8, 0 0 20px #00B4D8, 0 0 30px #00B4D8' },
        },
        neonPulse: {
          '0%': { boxShadow: '0 0 5px #00B4D8, 0 0 10px #00B4D8, 0 0 15px #00B4D8, 0 0 20px #8B5CF6' },
          '100%': { boxShadow: '0 0 10px #00B4D8, 0 0 20px #00B4D8, 0 0 30px #00B4D8, 0 0 40px #8B5CF6' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        cyberGlow: {
          '0%': { 
            boxShadow: '0 0 5px #00B4D8, 0 0 10px #00B4D8, 0 0 15px #00B4D8, 0 0 20px #8B5CF6, 0 0 25px #ec4899',
            borderColor: '#00B4D8'
          },
          '100%': { 
            boxShadow: '0 0 10px #00B4D8, 0 0 20px #00B4D8, 0 0 30px #00B4D8, 0 0 40px #8B5CF6, 0 0 50px #ec4899',
            borderColor: '#8B5CF6'
          },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blinkCaret: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#3b82f6' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}