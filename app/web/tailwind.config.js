module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors:{
        primary: '#16403F',
        secondary: '#F5F5F5',
        yellow:'#EEC573'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
