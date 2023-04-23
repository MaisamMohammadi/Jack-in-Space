/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        menu: "url('@/assets/images/background.png')",
      },
      dropShadow: {
        '3xl': '30px #3FB6FB',
      },
    },
    colors: {
      emerald: colors.emerald,
      white: '#EEEEEE',
      blue: '#3FB6FB',
      circle: '#4C556C',
      red: '#FB3F3F',
      black: '#11100D',
    },
  },
  plugins: [],
};
