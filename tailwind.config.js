/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "rgb(69, 136, 255)",
        "custom-blue-dark": "rgb(0,93,255)",
        "custom-blue-active": "rgb(209,227,255)",
      },
      boxShadow: {
        "custom-card": "0px 0px 5px 3px rgba(204,204,204,0.3)",
        "custom-header": "0px 4px 4px 0px rgba(204,204,204,0.75)",
        "custom-navbar": "1px 0px 0px 0px rgba(232,232,232,0.75)",
        "custom-info-fields": "0px 0px 1px 1px rgba(232,232,232,0.75)",
      },
      borderColor: {
        "custom-blue": "rgb(69, 136, 255)",
      },
    },
  },
  plugins: [],
};
