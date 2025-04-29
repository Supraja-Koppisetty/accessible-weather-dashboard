import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/Learn-React/accessible-weather-dashboard/",
  plugins: [react()],
});
