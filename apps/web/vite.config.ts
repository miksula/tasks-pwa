import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

const projects = ["./deno.json"];

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../api/public",
    emptyOutDir: true,
  },
  plugins: [tsconfigPaths({ projects }), devtoolsJson()],
  server: {
    proxy: {
      "/api": "http://localhost:9999",
    },
  },
});
