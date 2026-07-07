/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent — ECG mint / clinical monitor green
        primary: {
          50: '#eafff6',
          100: '#c9ffe9',
          200: '#93fdd4',
          300: '#5bf5bd',
          400: '#2ee8a5', // core pulse mint
          500: '#14d493',
          600: '#0bb37d',
          700: '#0a8f66',
          800: '#0c7053',
          900: '#0b5c45',
          950: '#04241b',
        },
        // Secondary accent — soft violet (model / research tone)
        violet: {
          300: '#b3a6ff',
          400: '#9683ff',
          500: '#7c66ff',
          600: '#6450e0',
          700: '#4d3daf',
        },
        // Tertiary accent — warm amber (alerts / highlights)
        amber: {
          200: '#ffe3b3',
          300: '#ffd28a',
          400: '#ffbe5c',
          500: '#ffab33',
        },
        // Near-black backgrounds with a hint of clinical green
        ink: {
          950: '#040807',
          900: '#060b0a',
          850: '#081010',
          800: '#0b1514',
          750: '#0e1a19',
          700: '#122120',
          600: '#1a2e2c',
        },
        // Keep a `dark` alias mapped to the ink scale for legacy classes
        dark: {
          50: '#f6fbf9',
          100: '#e9f5f0',
          200: '#c4d8d1',
          300: '#93aca6',
          400: '#64807a',
          500: '#3f5651',
          600: '#1a2e2c',
          700: '#122120',
          800: '#0b1514',
          900: '#060b0a',
          950: '#040807',
        },
        // Soft text tones
        mist: {
          100: '#e9f5f0', // primary text
          200: '#c4d8d1',
          300: '#93aca6', // muted green-gray
          400: '#64807a',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        glow: '0 0 24px rgba(46, 232, 165, 0.35)',
        'glow-lg': '0 0 60px rgba(46, 232, 165, 0.25)',
        'glow-violet': '0 0 40px rgba(124, 102, 255, 0.3)',
        panel: '0 20px 60px -20px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(46,232,165,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(46,232,165,0.045) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(20,212,147,0.16), transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'grid-pan': 'gridPan 24s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        blink: 'blink 1.1s steps(2, start) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(40px)' },
          '50%': { opacity: '1', filter: 'blur(48px)' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
