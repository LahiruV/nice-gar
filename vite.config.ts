import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@zenra/components': path.resolve(__dirname, './src/components/index.ts'),
      '@zenra/constants': path.resolve(__dirname, './src/common/constants/index.ts'),
      '@zenra/pages': path.resolve(__dirname, './src/pages/index.ts'),
      '@zenra/widgets': path.resolve(__dirname, './src/widgets/index.ts'),
      '@zenra/services': path.resolve(__dirname, './src/services/index.ts'),
      '@zenra/models': path.resolve(__dirname, './src/models/index.ts'),
      '@zenra/store': path.resolve(__dirname, './src/store/index.ts')
    }
  }
})
