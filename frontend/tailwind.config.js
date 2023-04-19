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
      fontColor: '#EEEEEE',
      blue: '#3FB6FB',
      yellow: '#DCFB3F',
      circle: '#4C556C',
      shadow: '#3FB6FB',
      red: '#FB3F3F',
    },
  },
  plugins: [],
};
