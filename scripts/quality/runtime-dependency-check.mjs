import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const checker = [
  resolve(root, '../design-ui/bin/runtime-dependency-check.mjs'),
  resolve(root, '.design-ui/bin/runtime-dependency-check.mjs'),
].find(existsSync)
if (!checker) {
  throw new Error(
    'design-ui runtime dependency checker not found; clone design-ui next to this repository or into .design-ui.',
  )
}
const tests = spawnSync(process.execPath, ['--test', resolve(dirname(checker), 'runtime-dependency-check.test.mjs')], {
  env: { ...process.env, UI_RUNTIME_CHECK_ROOT: root },
  stdio: 'inherit',
})
if (tests.status !== 0) {
  process.exit(tests.status ?? 1)
}
const { auditRuntimeDependencies } = await import(pathToFileURL(checker).href)
const report = auditRuntimeDependencies(root, 'maple')
console.log(
  `Maple: ${report.runtimeModules} runtime modules, ${report.toolingModules} tooling modules; no cycles, root backflow or HMR workarounds.`,
)
