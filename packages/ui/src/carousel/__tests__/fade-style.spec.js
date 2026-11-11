import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'

const less = createRequire(resolve(process.cwd(), '../cli/package.json'))('less')

test('the CLI Less compiler preserves the fade grid row and column', async () => {
  const filename = resolve(process.cwd(), 'src/carousel/style/index.less')
  const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
  const rule = css.split('.mp-carousel--fade .mp-carousel-item {')[1].split('}')[0]
  expect(rule).toContain('grid-area: 1 / 1;')
})
