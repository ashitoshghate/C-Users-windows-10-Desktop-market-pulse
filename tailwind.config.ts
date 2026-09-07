import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
    },
    extend: {
      colors: {
        navy: {
          950: "#04070F",
          900: "#080E1F",
          800: "#0D1730",
          700: "#132145",
          600: "#1A2E5C",
          500: "#233E78",
        },
        electric: {
          600: "#1348C7",
          500: "#1E5EEB",
          400: "#3E7BFF",
          300: "#74A2FF",
          200: "#AFC7FF",
          100: "#E3ECFF",
        },
        cyan: {
          500: "#17C3E0",
          400: "#3FDBF2",
        },
        ink: {
          900: "#0B1220",
          700: "#374357",
          500: "#5D6B84",
          300: "#98A5BD",
          100: "#E7ECF5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F5F8FC",
          mist: "#EEF3FB",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(120deg, #1E5EEB 0%, #17C3E0 100%)",
        "gradient-brand-soft": "linear-gradient(120deg, rgba(30,94,235,0.10) 0%, rgba(23,195,224,0.10) 100%)",
        "gradient-navy": "linear-gradient(180deg, #0D1730 0%, #04070F 100%)",
        "gradient-radial-glow": "radial-gradient(circle at 30% 20%, rgba(62,123,255,0.35), transparent 60%)",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(11,18,32,0.08)",
        "card-hover": "0 16px 40px -8px rgba(30,94,235,0.22)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -12px rgba(30,94,235,0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        fade: "fade 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
