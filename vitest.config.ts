import { defineConfig, configDefaults } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
      thresholds: {
        "**/**": {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
    },
    exclude: [...configDefaults.exclude, "e2e"],
  },
})
