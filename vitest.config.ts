import { defineConfig, configDefaults } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [tsconfigPaths()],
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*'],
      // Once the coverage is 100%, uncomment the thresholds to enforce it
      // thresholds: {
      //   '**/**': {
      //     branches: 100,
      //     functions: 100,
      //     lines: 100,
      //     statements: 100,
      //   },
      // },
    },
    exclude: [...configDefaults.exclude, 'e2e']
  },

})
