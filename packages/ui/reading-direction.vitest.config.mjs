import { fileURLToPath } from 'node:url'
import base from '../cli/lib/node/config/vitest.config.js'

// Check the authored composable, even when a previously built use package exists.
export default {
  ...base,
  resolve: {
    ...base.resolve,
    alias: [
      ...base.resolve.alias,
      {
        find: '@maple-design/use-vue',
        replacement: fileURLToPath(new URL('../use/src/index.ts', import.meta.url)),
      },
    ],
  },
}
