/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom gradient from secondary color to white
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #ededed, #ffffff)',
      },
      // Add custom colors if needed
      colors: {
        primary: '#ffffff',  // Assuming primary color as white
        secondary: '#ededed',  // Light grey as secondary color
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
