import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'

const less = createRequire(resolve(process.cwd(), '../cli/package.json'))('less')

test('message styles compile while preserving browser-resolved layer limits', async () => {
  const filename = resolve(process.cwd(), 'src/message/style/index.less')
  const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
  const layer = 'z-index: max(var(--mp-message-z-index), var(--mp-internal-message-z-index, 0));'

  expect(css).toContain('.mp-message-list {')
  expect(css).toContain('.mp-message__standalone {')
  expect(css.split(layer)).toHaveLength(3)
})
