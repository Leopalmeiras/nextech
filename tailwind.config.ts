import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#17212b", accent: "#c82932", canvas: "#f5f7f9" }, boxShadow: { soft: "0 8px 30px rgba(15,23,42,.06)" } } },
  plugins: [],
};
export default config;
