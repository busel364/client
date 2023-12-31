/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
      },
      backgroundImage: {
        texture:
          "url(/glow-texture.png), radial-gradient(var(--color-primary), transparent 70%)",
      },
    },
  },
  plugins: [],
};