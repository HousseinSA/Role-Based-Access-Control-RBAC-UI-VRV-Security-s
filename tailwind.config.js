/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust according to your file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f9e6',   // Lightest green
          100: '#c2f0c2',  // Light green
          200: '#99e699',  // Medium light green
          300: '#66cc66',  // Medium green
          400: '#33b033',  // Darker green
          500: '#009900',  // Main green color
          600: '#008000',  // Dark green
          700: '#006600',  // Darker green
          800: '#004d00',  // Very dark green
          900: '#003300'   // Darkest green
        },
      },
    },
  },
  plugins: [],
};