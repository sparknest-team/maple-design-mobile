import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { pathToFileURL } from 'node:url'

test('aggregate component properties preserve live bindings during circular entry evaluation', async () => {
  const entry = await readFile(new URL('../../packages/maple-ui/src/maple-vue.ts', import.meta.url), 'utf8')
  const generator = await readFile(
    new URL('../../packages/maple-cli/src/node/compiler/generateLibraryEntry.ts', import.meta.url),
    'utf8',
  )
  assert.match(generator, /get \$\{name\}\(\) \{ return \$\{name\} \}/)
  const property = entry.match(/get Image\(\) \{ return Image \}/)?.[0]
  assert.ok(property, 'generated entry must not eagerly read Image')
  const directory = await mkdtemp(join(tmpdir(), 'maple-entry-cycle-'))
  try {
    await writeFile(join(directory, 'library.mjs'), `import Image from './image.mjs'; export default { ${property} };`)
    await writeFile(
      join(directory, 'image.mjs'),
      `import library from './library.mjs'; const Image = { name: 'Image' }; export const readLibraryImage = () => library.Image; export default Image;`,
    )
    const image = await import(pathToFileURL(join(directory, 'image.mjs')).href)
    assert.equal(image.readLibraryImage(), image.default)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
