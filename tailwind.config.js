/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Strictly monochrome. `primary` is the accent ramp — in this theme the
           accent IS white, so emphasis comes from contrast, not hue. */
        primary: {
          50: '#ffffff',
          100: '#fbfbfb',
          200: '#f2f2f2',
          300: '#e6e6e6',
          400: '#ffffff',
          500: '#d4d4d4',
          600: '#a3a3a3',
          700: '#7d7d7d',
          800: '#5a5a5a',
          900: '#3d3d3d',
          950: '#1a1a1a',
        },
        /* Kept as names so existing classes keep working — all neutral now. */
        violet: {
          300: '#e0e0e0',
          400: '#c4c4c4',
          500: '#a3a3a3',
          600: '#7d7d7d',
          700: '#5a5a5a',
        },
        amber: {
          200: '#f0f0f0',
          300: '#dedede',
          400: '#bdbdbd',
          500: '#9e9e9e',
        },
        /* Surfaces — near-black through charcoal. */
        ink: {
          950: '#0a0a0a',
          900: '#0f0f0f',
          850: '#141414',
          800: '#181818',
          750: '#1f1f1f',
          700: '#262626',
          600: '#333333',
        },
        dark: {
          50: '#fafafa',
          100: '#f0f0f0',
          200: '#d9d9d9',
          300: '#b8b8b8',
          400: '#8f8f8f',
          500: '#666666',
          600: '#333333',
          700: '#262626',
          800: '#181818',
          900: '#0f0f0f',
          950: '#0a0a0a',
        },
        /* Text tones — tuned for contrast on #0a0a0a. */
        mist: {
          100: '#fafafa', // headings — ~19:1
          200: '#e4e4e4', // strong body — ~15:1
          300: '#b4b4b4', // body — ~9:1
          400: '#8a8a8a', // muted labels — ~5.4:1
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      boxShadow: {
        glow: '0 0 24px rgba(255, 255, 255, 0.12)',
        'glow-lg': '0 0 60px rgba(255, 255, 255, 0.08)',
        'glow-violet': '0 0 40px rgba(255, 255, 255, 0.08)',
        panel: '0 20px 60px -20px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06), transparent 60%)',
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
