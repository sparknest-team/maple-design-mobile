import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const candidates = [
  resolve(root, '../design-ui/bin/spec-check.mjs'),
  resolve(root, '.design-ui/bin/spec-check.mjs'),
]
const checker = candidates.find(existsSync)

if (!checker) {
  console.error(
    'design-ui not found. Clone it next to this repository or into .design-ui.',
  )
  process.exit(2)
}

const result = spawnSync(
  process.execPath,
  [checker, '--config', resolve(root, 'design-system.config.json'), ...process.argv.slice(2)],
  {
    cwd: root,
    stdio: 'inherit',
  },
)
process.exit(result.status ?? 1)
