/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          DEFAULT: '#B19CD9',
          light: '#E6DFF5',
          deep: '#7B5EA7',
        },
        cream: '#FFF8F0',
        mint: '#A8E6CF',
        coral: '#FF8B94',
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(123, 94, 167, 0.12)',
        card: '0 4px 16px rgba(123, 94, 167, 0.10)',
      },
      fontFamily: {
        korean: ['"Nanum Gothic"', 'sans-serif'],
        han: ['"Noto Sans SC"', '"PingFang SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
