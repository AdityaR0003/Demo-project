/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0040df",
        "primary-container": "#2d5bff",
        "primary-fixed": "#dde1ff",
        "primary-fixed-dim": "#b8c3ff",
        "secondary": "#883ca6",
        "secondary-container": "#e08efe",
        "secondary-fixed": "#f9d8ff",
        "secondary-fixed-dim": "#edb1ff",
        "tertiary": "#a80054",
        "tertiary-container": "#ce206d",
        "tertiary-fixed": "#ffd9e1",
        "tertiary-fixed-dim": "#ffb1c6",
        "surface": "#f7f9fb",
        "surface-bright": "#f7f9fb",
        "surface-dim": "#d8dadc",
        "surface-container": "#eceef0",
        "surface-container-low": "#f2f4f6",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "surface-variant": "#e0e3e5",
        "on-surface": "#191c1e",
        "on-surface-variant": "#434656",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "outline": "#747688",
        "outline-variant": "#c4c5d9",
        "error": "#ba1a1a",
        "error-container": "#ffdad6"
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'sans-serif'],
        display: ['"Hanken Grotesk"', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glass': '0 20px 50px rgba(45, 91, 255, 0.08)',
        'btn-glow': '0 10px 20px -5px rgba(0, 64, 223, 0.4)',
      }
    },
  },
  plugins: [],
}
