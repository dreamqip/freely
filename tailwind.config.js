const { screens, flex, fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient':
          'radial-gradient(farthest-side at 73% 21%, transparent, rgb(0, 0, 0))',
        'text-gradient-1': 'linear-gradient(to left, #7928CA, #FF0080)',
        'text-gradient-2': 'linear-gradient(to left, #FF4D4D, #F9CB28)',
        'text-gradient-3': 'linear-gradient(to left, #007CF0, #00DFD8)',
      },
      backgroundColor: {
        'dark-90': '#00000090',
        'white-90': '#ffffff90',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      colors: {
        'dark-theme': '#000000',
        'primary-dark': '#BB86FC',
        'primary-500': '#6200EE',
        'primary-700': '#3700B3',
        secondary: '#03DAC5',
      },
    },
    screens: {
      xs: '390px',
      ...screens,
    },
    flex: {
      '0-auto': '0 0 auto',
      ...flex,
    },
  },
  important: true,
  darkMode: 'class',
};
