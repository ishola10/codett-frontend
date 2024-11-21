module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',  // Modify based on your project file extensions
  ],
  theme: {
    extend: {
      fontFamily: {
        bruno: ['"Bruno Ace"', 'sans-serif'],
        'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
