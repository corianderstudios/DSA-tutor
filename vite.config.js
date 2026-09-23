import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/DSA-tutor/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    css: true,
  },
});
