import { defineConfig } from '@configurajs/prettier'

/**
 * 与 cedar / design-ui 共用同一个预设：单引号、无分号、printWidth 120。
 *
 * trailingComma 与 endOfLine 显式声明，不吃 Prettier 的默认值，
 * 避免上游改默认值时本仓风格被动漂移。
 */
export default defineConfig({
  trailingComma: 'all',
  endOfLine: 'lf',
})
