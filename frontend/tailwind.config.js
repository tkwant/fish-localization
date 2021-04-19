const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {
      width: {
        '300': '300px',
        '250': '250px',
      },
      colors: {
        grayBlue: {
          light: '#7D82B8',
          DEFAULT: '#7D82B8',
          dark: '#7D82B8',
        },
        lightGreen: {
          DEFAULT: '#ECFDF5'
        },
        lightPink: {
          DEFAULT: '#F5F3FF'
        },
        lightRed: {
          DEFAULT: '#FEF2F2'
        },
        lightBlue: {
          DEFAULT: '#EFF6FF'
        },
        green: {
          DEFAULT: '#289669'
        },
        red: {
          DEFAULT: '#DC2626'
        },
        purple: {
          DEFAULT: '#7C3AED'
        },
        blue: {
          DEFAULT: '#3163EB'
        }
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};