import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        "normal-font-color": "#202025",
        "card-font-color": "#505050",
        "card-font-rgba-color": "rgba(80,80,80,0.2)",
        success: "#3CDC3C",
        dark: "#202025",
        warn: "#FF9179",
        good: "#B9A9FB",
        "black-rgba": "rgba(0, 0, 0, 0.54)",
      },
      extend: {
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        borderWidth: {
          "0.5": "0.5px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
