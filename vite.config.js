import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // اسم پوشه‌ای که توی public_html گذاشتی
  plugins: [react()],
});
