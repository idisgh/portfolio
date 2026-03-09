/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        surface: '#0e0e0e',
        border: '#1a1a1a',
        'text-sub': '#999',
        'text-muted': '#666',
      },
      fontFamily: {
        sans: ['Pretendard', 'Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'Pretendard', 'sans-serif'],
      },
      screens: {
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}
