import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/_assets'),
      '@context': path.resolve(__dirname, './src/_context'),
      '@styles': path.resolve(__dirname, './src/_styles'),
      '@config': path.resolve(__dirname, './src/config'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@services': path.resolve(__dirname, './src/services'),
      '@dt-types': path.resolve(__dirname, './src/_types/index.ts'),
    },
  },
  css: {
    devSourcemap: true,
  },
})

