/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "flow-left-to-right": "flowLeftToRight 4s linear infinite",
        "flow-right-to-left": "flowRightToLeft 4s linear infinite",
      },
      keyframes: {
        flowLeftToRight: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        flowRightToLeft: {
          "0%": { backgroundPosition: "200% 0%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
      },
    },
  },
  plugins: [],
};
