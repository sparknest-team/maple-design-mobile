import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const tool = [
  resolve(root, '../design-ui/bin/package-check.mjs'),
  resolve(root, '.design-ui/bin/package-check.mjs'),
].find(existsSync)
if (!tool) {
  process.exitCode = 2
} else {
  process.exitCode =
    spawnSync(process.execPath, [tool, '--package', 'packages/maple-ui', '--max-kb', '20000'], {
      cwd: root,
      stdio: 'inherit',
    }).status ?? 1
}
