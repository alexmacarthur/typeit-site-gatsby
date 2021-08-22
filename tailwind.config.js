module.exports = {
  mode: "jit",
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx,md}"],
  },
  theme: {
    extend: {
      colors: {
        pink: "#d183c9",
        green: "rgba(69, 138, 103, 1)",
        gray: {
          default: "#242424",
          light: "#f4f4f4",
          mediumLight: "#6b6969",
          medium: "#575757",
        },
      },
      boxShadow: {
        default:
          "0 0px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, .06)",
        outline: "0 0 0 3px rgb(244, 244, 244)",
      },
      variants: {
        textColor: ["hover"],
        padding: ["first", "last"],
        margin: ["last"],
      },
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    inset: {
      0: 0,
      auto: "auto",
      1: "1rem",
      50: "50%",
    },
  },
  plugins: [],
};
