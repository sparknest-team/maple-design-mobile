import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'
import { imagePreviewGroupProps, imagePreviewProps, imageProps } from '..'

const root = resolve(process.cwd(), 'src/image')
const files = existsSync(resolve(root, 'README.md'))
  ? ['README.md', 'README.en-US.md']
  : ['docs/zh-CN.md', 'docs/en-US.md']
const section = (text: string, name: string) => {
  const start = text.indexOf(`### ${name}\n`)
  if (start < 0) {
    return ''
  }
  const after = text.slice(start + name.length + 5)
  return after.split(/\n#{1,3} /)[0]
}
const kebab = (value: string) => value.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase())
for (const file of files) {
  test(`${file} covers the actual Image family contracts`, () => {
    const text = readFileSync(resolve(root, file), 'utf8')
    for (const [name, props] of [
      ['Image Props', imageProps],
      ['ImagePreview Props', imagePreviewProps],
      ['ImagePreviewGroup Props', imagePreviewGroupProps],
    ] as const) {
      const rows = section(text, name)
        .split('\n')
        .filter((line) => line.startsWith('|'))
        .map((line) => line.split('|')[1])
      for (const key of Object.keys(props)) {
        expect(
          rows.some((row) =>
            row
              .split(/\s*\/\s*/)
              .map((part) => part.trim())
              .includes(kebab(key)),
          ),
          `${name}: ${key}`,
        ).toBe(true)
      }
    }
    for (const [name, slots] of [
      ['Image Slots', ['extra', 'placeholder', 'loader', 'error', 'error-icon', 'preview-actions']],
      ['ImagePreview Slots', ['image', 'actions', 'close-icon', 'overlay', 'extra']],
      ['ImagePreviewGroup Slots', ['default', 'close-icon', 'indicator', 'extra', 'actions']],
      ['ImagePreviewAction Slots', ['default']],
    ] as const) {
      const body = section(text, name)
      for (const slot of slots) {
        expect(body).toContain(slot)
      }
    }
    for (const [name, methods] of [
      ['Image Methods', ['showPreview']],
      [
        'ImagePreview Methods',
        ['open', 'close', 'reset', 'zoomTo', 'zoomIn', 'zoomOut', 'rotateLeft', 'rotateRight', 'toggleFullscreen'],
      ],
      [
        'ImagePreviewGroup Methods',
        [
          'open',
          'close',
          'prev',
          'next',
          'to(',
          'reset',
          'zoomTo',
          'zoomIn',
          'zoomOut',
          'rotateLeft',
          'rotateRight',
          'toggleFullscreen',
        ],
      ],
    ] as const) {
      const body = section(text, name)
      for (const method of methods) {
        expect(body).toContain(method)
      }
    }
  })
}
