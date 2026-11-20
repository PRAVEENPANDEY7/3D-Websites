/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#163D2B',
          deep: '#0F2B1E',
          light: '#1E4E37',
        },
        botanical: {
          DEFAULT: '#315B3B',
          light: '#3F744C',
          dark: '#24432B',
        },
        cream: {
          DEFAULT: '#F5F0E5',
          soft: '#FAF7F0',
          muted: '#E6DECE',
        },
        terracotta: {
          DEFAULT: '#A95732',
          light: '#C26A41',
          dark: '#874324',
        },
        gold: {
          DEFAULT: '#C7A66A',
          light: '#D8BC86',
          dark: '#AC8B4F',
          muted: '#8A7247',
        },
        charcoal: {
          DEFAULT: '#242821',
          pure: '#141712',
          card: '#1B2019',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'steam-drift': 'steam 8s ease-in-out infinite',
        'subtle-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: 0.3 },
          '50%': { transform: 'translateY(-15px) scale(1.05)', opacity: 0.6 },
        }
      }
    },
  },
  plugins: [],
}
