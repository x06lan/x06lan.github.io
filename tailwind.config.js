/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}","./src/**/**/*.{html,js,tsx}"],
  theme: {
    extend: {
        screens: {
          xs: '100px',
          sm: '300px',
          md: '450px',
          lg: '976px',
          xl: '1440px',
        },
        colors: {
          'blue': '#1fb6ff',
          'red': '#ff0000',
          'purple': '#7e5bef',
          'pink': '#ff49db',
          'orange': '#ff7849',
          'green': '#13ce66',
          'yellow': '#ffc82c',
          'gray-dark': '#273444',
          'gray': '#8492a6',
          'gray-light': '#d3dce6',
        },
        animationDuration: {
          '300': '300ms',
          '500': '500ms',
          '1000': '1000ms',
        },
        height:{
          'v1/2': 'calc(100vh*0.5)',
          'v1/3': 'calc(100vh*0.333)',
          'v2/3': 'calc(100vh*0.6666)',
        }
    },
  },
  plugins: [],
}
