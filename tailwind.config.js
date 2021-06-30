module.exports = {
  // mode: 'jit',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [
        /border-(primary|secondary|info|warning|danger|success)-(200|500|gray)/,
        /text-(primary|secondary|info|warning|danger|success|gray)-(50|200|500)/,
        /bg-(primary|secondary|info|warning|danger|success|gray)-(400|500|600)/,
        /ring-(primary|secondary|info|warning|danger|success|gray)-(400|500)/,
      ],
    },
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      // lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      lg: '0 0 20px rgba(8, 21, 66, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    colors: {
      // Utility Colours
      black: '#000',
      white: '#FFF',
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        50: '#f9f9f9',
        100: '#f2f2f3',
        200: '#dfdfe1',
        300: '#cbcccf',
        400: '#a5a6aa',
        500: '#7E8086',
        600: '#717379',
        700: '#5f6065',
        800: '#4c4d50',
        900: '#3e3f42',
        gradient: '#cbcccf',
      },
      // Theme Colours
      // Each color has 10 variants
      primary: {
        '50': '#f8f7ff',
        '100': '#f0efff',
        '200': '#dad7fe',
        '300': '#c4bffd',
        '400': '#978efc',
        '500': '#6B5EFA',
        '600': '#6055e1',
        '700': '#5047bc',
        '800': '#403896',
        '900': '#342e7b'
      },
      secondary: {
        50: '#ffc662',
        100: '#ffbc58',
        200: '#ffb24e',
        300: '#fda844',
        400: '#f39e3a',
        500: '#e99430',
        600: '#df8a26',
        700: '#d5801c',
        800: '#cb7612',
        900: '#c16c08',
      },
      success: {
        50: '#f6fcf4',
        100: '#eef8e9',
        200: '#d4eec9',
        300: '#b9e4a8',
        400: '#85cf66',
        500: '#51BB25',
        600: '#49a821',
        700: '#3d8c1c',
        800: '#317016',
        900: '#285c12',
      },
      danger: {
        50: '#fdf5f6',
        100: '#fcebec',
        200: '#f6cdd1',
        300: '#f1aeb5',
        400: '#e7727d',
        500: '#DC3545',
        600: '#c6303e',
        700: '#a52834',
        800: '#842029',
        900: '#6c1a22',
      },
      warning: {
        50: '#fffdf4',
        100: '#fefbea',
        200: '#fdf5ca',
        300: '#fcefaa',
        400: '#fae26b',
        500: '#F8D62B',
        600: '#dfc127',
        700: '#baa120',
        800: '#95801a',
        900: '#7a6915',
      },
      info: {
        50: '#f2f8ff',
        100: '#e6f2ff',
        200: '#bfdeff',
        300: '#99caff',
        400: '#4da2ff',
        500: '#007AFF',
        600: '#006ee6',
        700: '#005cbf',
        800: '#004999',
        900: '#003c7d',
      },
      uoa: '#00467F',
      aut: '#000000',
      vic: '#3E9C4F',
      massey: '#8998B9',
      otago: '#F9C000',
    },

    extend: {
      height: {
        '90vh': '90vh',
        '80vh': '80vh',
        hero: '40vh',
      },
      backgroundImage: {
        // hero: 'url(../assets/landing-background.svg)',
        hero: 'url(../assets/bg_3.svg)',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      keyframes: {
        scroll: {
          '0%': {
            'background-size': '200% 100%',
            'background-position': '200% center',
          },
          '50%': {
            'background-size': '200% 100%',
            'background-position': '0% center',
          },
          '100%': {
            'background-size': '200% 100%',
            'background-position': '-200% center',
          },
        },
        'modal-bg-fade-in': {
          '0%': {
            background: 'rgba(62,63,66,0)',
          },
          '100%': {
            background: 'rgba(62,63,66,0.75)',
          },
        },
        'modal-bg-fade-out': {
          '0%': {
            background: 'rgba(62,63,66,0.75)',
          },
          '100%': {
            background: 'rgba(62,63,66,0)',
          },
        },
        'float-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-1rem) scale(0.8, 0.8)',
          },
          '75%': {
            opacity: '1',
          },
          '100%': {
            transform: 'unset',
          },
        },
        'float-out': {
          '0%': {
            transform: 'unset',
          },
          '25%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-1rem) scale(0.8, 0.8)',
            opacity: '0',
          },
        },
      },
      animation: {
        scrollRight: 'scroll 5s ease-in-out infinite',
        'modal-bg-fade-in': 'modal-bg-fade-in 200ms',
        'modal-bg-fade-out': 'modal-bg-fade-out 200ms',
        'float-in': 'float-in 200ms',
        'float-out': 'float-out 200ms',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      width: ['hover'],
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [],
};
