module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      // caption uses the systemfont so it looks more native
      display: ['caption'],
      body: ['caption'],
    },
    extend: {
      colors: {
        background: {
          'light': '#FCFFFF',
          'dark': '#1D1D20',
        },
        'control-color': '#72747B',
        'control-hover-color': '#2B2B2E',
        toolbarBorderColor: '#CFCFCF',
        paragraph: '#696C74',
        documentTagBg: '#424247',
        documentTagText: '#9E9E9E',
        documentTagAddBg: '#2A2A2E',
        primary: {
          100: '#91C4D7',
          200: '#65ACC8',
          300: '#4FA0C0',
          400: '#4091B1',
          500: '#387F9B',
          600: '#306D85',
          700: '#285B6F',
          800: '#204959',
          900: '#183642',
        },
      },
    },
  },
  variants: {
    outline: ['focus', 'hover'],
    border: ['focus', 'hover'],
  },
  plugins: [],
}
