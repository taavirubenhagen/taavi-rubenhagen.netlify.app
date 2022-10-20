/** @type {import("tailwindcss").Config} */


const colors = require("tailwindcss/colors")




let bright = true




module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        background: bright ? colors.white : colors.black,
        onbackground: bright ? colors.black : colors.white,
        container: bright ? colors.white : colors.black,
        oncontainer: bright ? colors.black : colors.white,
        primary: bright ? colors.black : colors.white,
        onprimary: colors.black,
        secondary: colors.gray,
        tertiary: colors.cyan,
      },
    },
  },
  plugins: [],
}
