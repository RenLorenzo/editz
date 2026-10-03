export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { paper: "#f5f3ee", ink: "#171717", mute: "#77736d", accent: "#ff6b3d", line: "rgba(20,20,20,.12)" },
      fontFamily: { serif: ['"Instrument Serif"', '"DM Serif Display"', "Georgia", "serif"], sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
