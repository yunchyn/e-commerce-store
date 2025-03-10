import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "#000000",
        blue: "#377DFF",
        green: "#38CB89",
        orange: "#FFAB00",
        red: "#FF5630",
        neutral: {
          1: "#FEFEFE",
          2: "#F3F5F7",
          3: "#E8ECEF",
          4: "#6C7275",
          5: "#343839",
          6: "#232627",
          7: "#141718",
        },
      },
      fontFamily: {
        hero: ["Poppins", "NotoSans", "serif"],
        headline: ["Poppins", "NotoSans", "serif"],
        body: ["Inter-Regular", "NotoSans", "serif"],
        "body-semi": ["Inter-SemiBold", "NotoSans", "serif"],
        "body-bold": ["Inter-Bold", "NotoSans", "serif"],
        caption: ["Inter-Regular", "NotoSans", "serif"],
        "caption-semi": ["Inter-SemiBold", "NotoSans", "serif"],
        "caption-bold": ["Inter-Bold", "NotoSans", "serif"],
        hairline: ["Inter-Bold", "NotoSans", "serif"],
        button: ["Inter-Medium", "NotoSans", "serif"],
      },
      fontSize: {
        hero: ["96px", { lineHeight: "96px" }],
        headline1: ["80px", { lineHeight: "84px" }],
        headline2: ["72px", { lineHeight: "76px" }],
        headline3: ["54px", { lineHeight: "58px" }],
        headline4: ["40px", { lineHeight: "44px" }],
        headline5: ["34px", { lineHeight: "38px" }],
        headline6: ["28px", { lineHeight: "34px" }],
        headline7: ["20px", { lineHeight: "28px" }],
        body1: ["20px", { lineHeight: "32px" }],
        body1Semi: ["20px", { lineHeight: "32px" }],
        body1Bold: ["20px", { lineHeight: "32px" }],
        body2: ["16px", { lineHeight: "26px" }],
        body2Semi: ["16px", { lineHeight: "26px" }],
        body2Bold: ["16px", { lineHeight: "26px" }],
        caption1: ["14px", { lineHeight: "22px" }],
        caption1Semi: ["14px", { lineHeight: "22px" }],
        caption1Bold: ["14px", { lineHeight: "22px" }],
        caption2: ["12px", { lineHeight: "20px" }],
        caption2Semi: ["12px", { lineHeight: "20px" }],
        caption2Bold: ["12px", { lineHeight: "20px" }],
        hairline1: ["16px", { lineHeight: "16px" }],
        hairline2: ["12px", { lineHeight: "12px" }],
        buttonXL: ["26px", { lineHeight: "38px" }],
        buttonL: ["22px", { lineHeight: "34px" }],
        buttonM: ["18px", { lineHeight: "32px" }],
        buttonS: ["16px", { lineHeight: "28px" }],
        buttonXS: ["14px", { lineHeight: "24px" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
