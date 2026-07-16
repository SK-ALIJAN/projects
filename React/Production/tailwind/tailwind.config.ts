export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#6b7280',
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};
