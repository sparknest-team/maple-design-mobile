import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: { '@config': fileURLToPath(new URL('./src/node/config/maple.default.config.ts', import.meta.url)) },
  },
  server: { host: '127.0.0.1' },
  plugins: [vue()],
  test: {
    maxWorkers: 2,
    minWorkers: 1,
    environment: 'jsdom',
    include: ['src/**/__tests__/*.spec.ts'],
  },
})
