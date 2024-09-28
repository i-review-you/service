/** @type {import('tailwindcss').Config} */
const sharedConfig = require("@i-review-you/config-tailwind");

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
};
