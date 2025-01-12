/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1s infinite',
      },
      colors: {
        background: "var(--background)", // カスタムCSS変数
        foreground: "var(--foreground)", // カスタムCSS変数
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(10%)' },
        },
      },
    },
  },
  plugins: [],
};
