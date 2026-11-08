module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF8F2',
        card: '#FEFCF8',
        ink: '#1F1B16',
        muted: '#6B645A',
        hair: '#E9E2D6',
        brown: '#A0592B',
        peach: '#FBE6D6',
        sand: '#F6DDB0',
        orange: '#F5A04A',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        hand: ['Kalam', 'cursive'],
      },
      boxShadow: {
        soft: '0 6px 18px rgba(120, 90, 50, 0.08)',
        lift: '0 24px 60px rgba(60, 40, 20, 0.25)',
      },
    },
  },
  plugins: [],
};
