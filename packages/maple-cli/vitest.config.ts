import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: { host: '127.0.0.1' },
  plugins: [vue()],
  test: {
    maxWorkers: 2,
    minWorkers: 1,
    environment: 'jsdom',
    include: ['site/**/*.spec.ts', 'src/**/__tests__/*.spec.ts'],
  },
})
