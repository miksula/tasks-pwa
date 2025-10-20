import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../api/public",
    emptyOutDir: true,
  },
  plugins: [devtoolsJson(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
});
