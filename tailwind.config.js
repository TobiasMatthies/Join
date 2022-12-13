/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "rgb(69, 136, 255)",
        "custom-blue-dark": "rgb(0,93,255)",
        "custom-blue-active": "rgb(209,227,255)",
        "custom-placeholder-gray": "rgb(209,209,209)",
        "custom-title-gray": "rgb(65,82,110)",
        "custom-red-urgent": "rgb(255,61,0)",
        "custom-orange-medium": "rgb(255,168,0)",
        "custom-green-low": "rgb(122,226,40)",
      },
      boxShadow: {
        "custom-card": "0px 0px 5px 3px rgba(204,204,204,0.3)",
        "custom-contacts-right": "3px 0px 5px 0px rgba(204,204,204,0.3)",
        "custom-header": "0px 4px 4px 0px rgba(204,204,204,0.75)",
        "custom-navbar": "1px 0px 0px 0px rgba(232,232,232,0.75)",
        "custom-info-fields": "0px 0px 1px 1px rgba(232,232,232,0.75)",
        "custom-contacts": "0px 0px 3px 3px rgba(232,232,232,0.75)",
        "custom-category-color": "0px 3px 5px 0px rgba(110,110,110,0.75)",
      },
      borderColor: {
        "custom-blue": "rgb(69, 136, 255)",
      },
    },
  },
  plugins: [],
};
