import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // This will make process.env available in the browser (via Vite)
    "process.env": process.env,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Adjust this if your API is on a different port
        changeOrigin: true,
      },
    },
  },
});
