import { cpus } from 'os'
import { dirname as pathDirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import { configDefaults, defineConfig } from 'vitest/config'
import { SRC_DIR, VITE_RESOLVE_EXTENSIONS } from '../shared/constant.js'

const configDir = pathDirname(fileURLToPath(import.meta.url))

const cpuNum = Math.max(cpus().length - 1, 1)

export default defineConfig({
  server: { host: '127.0.0.1' },
  resolve: {
    extensions: VITE_RESOLVE_EXTENSIONS,
    // Demo imports must resolve to the source under test, not require a prior library build.
    alias: [{ find: /^@maple-design\/ui-vue$/, replacement: resolve(SRC_DIR, 'index.ts') }],
  },

  plugins: [vue(), jsx()],

  test: {
    // Large component suites create a jsdom per file; bound their memory/IO
    // pressure so ordinary test commands remain stable alongside type checks.
    maxWorkers: Math.min(cpuNum, 4),
    minWorkers: 1,
    // Test authored component sources only; .maple contains copied CLI/site tests.
    include: configDefaults.include.map((pattern) => `src/${pattern}`),
    environment: 'jsdom',
    setupFiles: [resolve(configDir, 'vitest.setup.js')],
    coverage: {
      provider: 'istanbul',
      exclude: [
        '**/*.d.ts',
        '**/*.md',
        '**/example/**',
        '**/__tests__/**',
        'node_modules/**',
        '.maple/**',
        'es/**',
        'lib/**',
        'site/**',
        'umd/**',
        'docs/**',
        'coverage/**',
        'types/**',
        'shims/**',
        'maple.config.mjs',
      ],
    },
    globals: true,
    poolOptions: {
      vmThreads: {
        memoryLimit: Math.min((1 / cpuNum) * 2, 0.2),
      },
    },
  },
})
