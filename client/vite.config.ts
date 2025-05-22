import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
  // server: {
  //   allowedHosts: ["96d3-2409-40e6-a-96d4-d056-5e8b-1afd-1b6d.ngrok-free.app"]
  // }
})
