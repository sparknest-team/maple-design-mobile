import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// Less is owned by the local CLI build package, not by the UI runtime package.
const less = createRequire(resolve(process.cwd(), '../maple-cli/package.json'))('less')

describe('vertical divider text layout', () => {
  it('compiles a content-width override instead of retaining the zero-width plain line', async () => {
    const source = readFileSync(resolve(process.cwd(), 'src/divider/style/implementation.less'), 'utf8')
    const { css } = await less.render(source)
    const selector = '.mp-divider--with-text.mp-divider--orientation-vertical {'
    const rule = css.split(selector)[1].split('}')[0]
    expect(rule).toContain('width: fit-content;')
    expect(rule).toContain('max-width: 100%;')
  })
})
