// Rebuild the Maple port from Cedar in a temporary directory before writing any source.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const source = new URL('../../cedar-design-web/packages/ui/src/', import.meta.url)
const target = new URL('../packages/ui/src/', import.meta.url)
const manifest = new URL('./table-source/files.json', import.meta.url)
const files = JSON.parse(await readFile(manifest, 'utf8'))
const write = process.argv.includes('--write')
const temporary = await mkdtemp(join(tmpdir(), 'maple-table-source-'))
try {
  for (const [name, entry] of Object.entries(files)) {
    const original = await readFile(new URL(name, source), 'utf8')
    const hash = createHash('sha256').update(original).digest('hex')
    if (!write) {
      assert.equal(hash, entry.sha256, name + ' changed upstream. Run pnpm sync:table-source and review.')
    }
    entry.sha256 = hash
    const text = original
      .replaceAll('@cedar-design/icons-vue', '@maple-design/icons-vue')
      .replaceAll('_utils/global-config', 'utils/components')
      .replaceAll('_utils/vue-compat', 'utils/vue-compat')
      .replaceAll('--c-', '--mp-')
      .replaceAll('.c-', '.mp-')
      .replaceAll('c-table-', 'mp-table-')
      .replaceAll('data-c-theme', 'data-mp-theme')
    const path = join(temporary, entry.target)
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, text)
  }
  execFileSync(
    'git',
    ['apply', '--whitespace=nowarn', fileURLToPath(new URL('./table-source/mobile.patch', import.meta.url))],
    { cwd: temporary },
  )
  for (const { target: name } of Object.values(files)) {
    const text = await readFile(join(temporary, name), 'utf8')
    const file = new URL(name, target)
    if (write) {
      await mkdir(dirname(fileURLToPath(file)), { recursive: true })
      await writeFile(file, text)
    } else {
      assert.equal(await readFile(file, 'utf8'), text, name + ' differs from the Cedar port')
    }
  }
  if (write) {
    await writeFile(manifest, JSON.stringify(files, null, 2) + '\n')
  }
  console.log(
    'Verified ' + Object.keys(files).length + ' Cedar sources including Table entry, styles, demos and contracts.',
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
