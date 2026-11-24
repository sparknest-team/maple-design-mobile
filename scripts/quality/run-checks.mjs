import { spawnSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'

const [lane, ...args] = process.argv.slice(2)
const option = args.indexOf('--only')
let checks = args
if (option !== -1) {
  const requested = args.slice(option + 1)
  const available = args.slice(0, option)
  if (lane !== 'fast' || requested.length !== 1 || !available.includes(requested[0])) {
    throw new Error(`Unknown fast quality check: ${requested.join(' ')}`)
  }
  checks = requested
}

const failures = []
for (const check of checks) {
  const env = { ...process.env }
  if (check === 'check:docs-components' || check === 'check:compatibility') {
    delete env.DOCS_COMPONENTS
    delete env.DOCS_DIRECTION_CORE
    delete env.DOCS_DIRECTION_SKIP_GUIDES
  }
  if (check === 'check:docs-components') {
    if (lane === 'fast') {
      const { changedComponents } = await import('./changed-components.mjs')
      const components = await changedComponents()
      if (components.length) {
        env.DOCS_COMPONENTS = components.join(',')
      }
    }
    console.log(`Component browser coverage: ${env.DOCS_COMPONENTS || 'all components'}`)
  }

  const result = spawnSync('pnpm', [check], { env, stdio: 'inherit' })
  if (result.status === 0) {
    continue
  }

  const reason = result.error?.message || result.signal || `exit ${result.status}`
  console.error(`pnpm ${check} failed (${reason})`)
  failures.push(`- Failed: \`pnpm ${check}\` (${reason})`)
  if (lane === 'fast' || check === 'build:lib' || check === 'build:doc') {
    break
  }
}

if (failures.length) {
  if (lane === 'slow' && process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Slow quality failures\n${failures.join('\n')}\n`)
  }
  process.exitCode = 1
}
