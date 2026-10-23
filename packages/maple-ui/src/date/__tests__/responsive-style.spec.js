import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const less = createRequire(resolve(process.cwd(), '../maple-cli/package.json'))('less')

describe('standalone calendar style compilation', () => {
  for (const component of ['date']) {
    it(`compiles ${component} without clock styles`, async () => {
      const filename = resolve(process.cwd(), `src/${component}/style/index.less`)
      const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
      expect(css).not.toContain('clock-container')
      expect(css).toContain('mp-date-picker__quick-time')
    })
  }
})
