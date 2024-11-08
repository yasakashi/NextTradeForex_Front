import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
    mainFields: ["browser", "module", "main"], // Default field order for resolution
  },
  build: {
    minify: "terser", // Use terser instead of SWC for minification
  },
});
