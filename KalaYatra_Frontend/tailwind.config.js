/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // KalaYatra brand palette
        ivory: {
          50: '#FDFAF5',
          100: '#F9F3E8',
          200: '#F2E6D0',
          DEFAULT: '#F5EDD8',
        },
        charcoal: {
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#C7C4C1',
          400: '#8D8A87',
          600: '#57534E',
          700: '#3A3633',
          800: '#292524',
          900: '#1A1917',
          950: '#0D0C0B',
          DEFAULT: '#1C1917',
        },
        terracotta: {
          50: '#FDF2EE',
          100: '#FAE2D9',
          200: '#F5C4B0',
          300: '#EC9B79',
          400: '#E07247',
          500: '#C85A2E',
          600: '#A84424',
          700: '#863520',
          DEFAULT: '#C85A2E',
        },
        sandalwood: {
          50: '#FBF8F3',
          100: '#F5EFE3',
          200: '#E8D9C0',
          300: '#D4B896',
          400: '#BF9470',
          DEFAULT: '#D4B896',
        },
        gold: {
          100: '#FEF9EA',
          200: '#FDF0C4',
          300: '#FAD978',
          400: '#F5BC36',
          500: '#D9971A',
          600: '#B07610',
          DEFAULT: '#D4A017',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.04)',
        'glow-gold': '0 0 20px rgba(212, 160, 23, 0.3)',
        'glow-terracotta': '0 0 20px rgba(200, 90, 46, 0.25)',
      },
      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}
