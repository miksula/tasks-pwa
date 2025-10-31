import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../api/public",
    emptyOutDir: true,
  },
  plugins: [devtoolsJson()],
  server: {
    proxy: {
      "/api": "http://localhost:9999",
    },
  },
});
