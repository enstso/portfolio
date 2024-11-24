import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Activer le mode sombre basé sur la classe "dark"
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(222, 47%, 53%)", // Couleur principale
        "primary-foreground": "hsl(0, 0%, 100%)", // Texte sur couleur principale
        "muted-foreground": "hsl(0, 0%, 60%)", // Texte secondaire
        border: "hsl(0, 0%, 90%)",
        background: "var(--background)", // Couleurs dynamiques
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideIn: "slideIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
