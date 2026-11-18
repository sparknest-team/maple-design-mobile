import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export function checkMessage(message) {
  const subject = message.split(/\r?\n/).find(line => line.trim() && !line.startsWith('#')) ?? ''
  if (!/^(?:(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\([^\r\n)]+\))?!?: .+|(?:Merge|Revert|fixup!|squash!) .+)$/.test(subject)) {
    throw new Error('Use a Conventional Commit subject, e.g. fix(input): correct focus handling')
  }
}

export function run(mode, messageFile) {
  if (mode === 'install') {
    if (process.env.CI) return
    execFileSync('git', ['config', '--local', 'core.hooksPath', '.githooks'], { stdio: 'inherit' })
  } else if (mode === 'pre-commit') {
    // Inspect the index only; never format, lint, build, or alter the working tree.
    execFileSync('git', ['diff', '--cached', '--check'], { stdio: 'inherit' })
    const files = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z']).toString().split('\0').filter(Boolean)
    for (const file of files.filter(file => file.endsWith('.json'))) {
      try { JSON.parse(execFileSync('git', ['show', `:${file}`], { maxBuffer: 64 * 1024 * 1024 }).toString()) }
      catch (error) { throw new Error(`Invalid staged JSON: ${file}`, { cause: error }) }
    }
    console.log('Staged whitespace, conflict markers, and JSON: OK. Full quality runs in PR CI.')
  } else if (mode === 'commit-msg') {
    checkMessage(readFileSync(messageFile, 'utf8'))
  } else throw new Error(`Unknown hook mode: ${mode}`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try { run(process.argv[2], process.argv[3]) }
  catch (error) { console.error(error.message); process.exitCode = 1 }
}
