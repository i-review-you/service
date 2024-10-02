import sharedConfig from "@i-review-you/config-tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./styles/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/react-components/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [sharedConfig],
};
