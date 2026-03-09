import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: "127.0.0.1",
    port: 5175,
  },
  preview: {
    strictPort: true,
    host: "127.0.0.1",
    port: 5175,
  },
});
