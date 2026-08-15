/** @type {import('tailwindcss').Config} */

/*
 * Palette lifted from ChatGPT's own design tokens (read off chatgpt.com):
 *   --bg-primary #212121   --bg-secondary #303030   --bg-elevated-primary #1b1b1b
 *   --text-primary #fff    --text-secondary #cdcdcd --text-tertiary #afafaf
 *   --border-default #ffffff26
 *   --bg-accent-static #3a83f7   --text-accent #63a8f8
 * plus its six theme colors, which is where the site gets its color from.
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Accent — ChatGPT blue */
        primary: {
          50: '#eef5fe',
          100: '#d7e8fd',
          200: '#b0d0fb',
          300: '#8fc2fa',
          400: '#63a8f8', // --text-accent
          500: '#3a83f7', // --bg-accent-static
          600: '#2c67c5',
          700: '#214e94',
          800: '#173763',
          900: '#133463',
          950: '#0d2039',
        },
        /* The six theme colors, each with a tinted dark background + light text */
        blue:   { DEFAULT: '#3a83f7', text: '#63a8f8', bg: '#133463', on: '#e8f3fe' },
        green:  { DEFAULT: '#53b559', text: '#6cc971', bg: '#1f4e25', on: '#def3e5' },
        yellow: { DEFAULT: '#f6c543', text: '#f6c543', bg: '#734615', on: '#fdf6dc' },
        orange: { DEFAULT: '#ee7c37', text: '#f1a275', bg: '#653218', on: '#fbe8db' },
        purple: { DEFAULT: '#a67df2', text: '#b795f5', bg: '#3b2366', on: '#ede5fc' },
        pink:   { DEFAULT: '#f077af', text: '#f491c0', bg: '#663049', on: '#fdedf4' },

        /* Legacy alias kept so existing violet-* classes stay valid */
        violet: {
          300: '#b795f5',
          400: '#a67df2',
          500: '#8b5cf0',
          600: '#7040d4',
          700: '#3b2366',
        },
        amber: {
          200: '#fdf6dc',
          300: '#f6c543',
          400: '#ee7c37',
          500: '#d9661f',
        },
        /* Surfaces */
        ink: {
          950: '#000000',
          900: '#0d0d0d',
          850: '#171717',
          800: '#1b1b1b', // --bg-elevated-primary
          750: '#212121', // --bg-primary
          700: '#303030', // --bg-secondary
          600: '#414141', // --bg-tertiary
        },
        dark: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#cdcdcd',
          300: '#afafaf',
          400: '#8f8f8f',
          500: '#676767',
          600: '#414141',
          700: '#303030',
          800: '#212121',
          900: '#0d0d0d',
          950: '#000000',
        },
        /* Text */
        mist: {
          100: '#ffffff', // --text-primary
          200: '#cdcdcd', // --text-secondary
          300: '#afafaf', // --text-tertiary
          400: '#8f8f8f',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        '4xl': '1.75rem',
      },
      boxShadow: {
        glow: '0 0 24px rgba(58, 131, 247, 0.28)',
        'glow-lg': '0 0 60px rgba(58, 131, 247, 0.18)',
        'glow-violet': '0 0 40px rgba(166, 125, 242, 0.25)',
        panel: '0 20px 60px -20px rgba(0, 0, 0, 0.85)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(58,131,247,0.14), transparent 60%)',
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
