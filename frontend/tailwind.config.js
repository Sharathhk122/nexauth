// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#6366f1',
            DEFAULT: '#4f46e5',
            dark: '#4338ca',
          },
          dark: {
            light: '#1e293b',
            DEFAULT: '#0f172a',
            dark: '#020617',
          },
          light: {
            light: '#f8fafc',
            DEFAULT: '#f1f5f9',
            dark: '#e2e8f0',
          },
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'float-reverse': 'float-reverse 6s ease-in-out infinite',
          'spin-slow': 'spin 20s linear infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(5deg)' },
          },
          'float-reverse': {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(-5deg)' },
          },
        },
      },
    },
    plugins: [],
  }