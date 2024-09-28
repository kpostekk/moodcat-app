import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import router from "@tanstack/router-plugin/vite"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    router({
      generatedRouteTree: "src/route-tree.gen.ts",
      semicolons: false,
      quoteStyle: "double",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
