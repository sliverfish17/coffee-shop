import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 5000,
    strictPort: true,
    proxy: {
      "/uploads": "http://localhost:3000",
    },
  },
});
