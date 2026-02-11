import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Sitemap from "vite-plugin-sitemap";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), Sitemap({ hostname: "https://webtoon-hub.com" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
