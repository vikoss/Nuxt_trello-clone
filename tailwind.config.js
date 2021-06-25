module.exports = {
  purge: {
    enabled: false
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: {
          transparent: 'rgba(255, 255, 255, 0.3)',
          light: 'rgba(255, 255, 255, 0.2)',
          DEFAULT: '#fff'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
