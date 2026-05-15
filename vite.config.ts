import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // Tăng giới hạn lên 1000kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mysten')) {
              return 'sui-sdk'; // Tách riêng bộ SDK của Sui
            }
            if (id.includes('@tanstack')) {
              return 'tanstack-query';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons';
            }
            return 'vendor'; // Các thư viện khác gộp vào vendor
          }
        }
      }
    }
  }
})
