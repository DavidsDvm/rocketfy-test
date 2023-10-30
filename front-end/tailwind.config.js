/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'rocketfy-dark': '#0e0e1b',
        'rocketfy-orange': '#ed3900',
        'rocketfy-yellow': '#ff7600',
        'rocketfy-purple': '#5412fc',
        'rocketfy-lile': '#a74df9',
      },
      boxShadow: {
        'rocketfy': '0 1px 22px rgba(5,38,109,.12941176470588237)',
      }
    },
  },
  plugins: [],
}

