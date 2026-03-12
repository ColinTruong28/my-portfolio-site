import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.JPG"],
  plugins: [react(),
            tailwindcss(),
  ],
  base: '/my-portfolio-site/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 2. Add this alias
    },
  },
})
