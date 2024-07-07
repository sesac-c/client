/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,html}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      width: {
        'app': '27.5rem'
      },
      height: {
        'header': '56px',
        'board': '280px'
      },
      fontSize: {
        'title': '1.2rem',
        'basic': '1rem',
        'description': '0.85rem',
        'caption': '0.75rem',
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '1/3': '0 0 33.333333%',
        '2/3': '0 0 66.666667%',
        '1/4': '0 0 25%',
        '3/4': '0 0 75%',
      },
      colors: {
        'primary': {
          DEFAULT: "#187b46",
          'hover': '#1a9f57',
          '50': '#f0fdf5',
          '100': '#ddfbea',
          '200': '#bdf5d6',
          '300': '#89ecb6',
          '400': '#4fd98e',
          '500': '#27c06d',
          '600': '#1a9f57',
          '700': '#187b46',
          '800': '#18633c',
          '900': '#165132',
          '950': '#062d1a',
        },
        'secondary': {
          DEFAULT: "#f8fff6",
          '50': '#f8fff6',
          '100': '#deffd7',
          '200': '#c0ffb2',
          '300': '#8dff76',
          '400': '#53f533',
          '500': '#2cde09',
          '600': '#1eb900',
          '700': '#1b9005',
          '800': '#1a710a',
          '900': '#155d0a',
          '950': '#073400',
          'hover': '#1eb900',
        },
        'gray': {
          '50': '#f7f7f7',
          '100': '#ededed',
          '200': '#dfdfdf',
          '300': '#c8c8c8',
          '400': '#adadad',
          '500': '#9d9d9d',
          '600': '#888888',
          '700': '#7b7b7b',
          '800': '#676767',
          '900': '#545454',
          '950': '#363636',
          'input': '#FAFAFA',
          'inputBorder': '#9B9B9B',
          'placeholder': '#adadad',
          'disable': '#c8c8c8',

          'basic': '#4C4C4C',
          'dark': '#2B2B2B',

          'search': '#d3e4fd',

          'primary': '#adadad',
          'secondary': '#f0f0f0',
          'tertiary': "#fafafa",
        },
        'grayblue': {
          'primary': '#d3e4fd',
          'secondary': '#f0f2f5',
        },
        'red': {
          '50': '#fff0f0',
          '100': '#ffdddd',
          '200': '#ffc0c0',
          '300': '#ff9494',
          '400': '#ff5757',
          '500': '#ff2323',
          '600': '#ff0000',
          '700': '#d70000',
          '800': '#b10303',
          '900': '#920a0a',
          '950': '#500000',
          'danger': '#ff0000',
          'danger-background': '#fff0f0',
          'favorite': '#f27171',
        },
      },
    },
  },
  plugins: []
};