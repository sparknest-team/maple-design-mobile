import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 依赖是否已安装。路径基于当前工作目录（git 总在仓库根执行钩子），
 * 未安装时跳过暂存文件格式化，让新克隆在 `pnpm i` 之前也能提交。
 */
const hasDependencies = () => existsSync(join(process.cwd(), 'node_modules', '.bin'))

export function checkMessage(message) {
  const subject = message.split(/\r?\n/).find((line) => line.trim() && !line.startsWith('#')) ?? ''
  if (
    !/^(?:(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\([^\r\n)]+\))?!?: .+|(?:Merge|Revert|fixup!|squash!) .+)$/.test(
      subject,
    )
  ) {
    throw new Error('Use a Conventional Commit subject, e.g. fix(input): correct focus handling')
  }
}

export function run(mode, messageFile) {
  if (mode === 'install') {
    if (process.env.CI) {
      return
    }
    execFileSync('git', ['config', '--local', 'core.hooksPath', '.githooks'], { stdio: 'inherit' })
  } else if (mode === 'pre-commit') {
    // Format and lint-fix only the files being committed, then inspect the index.
    // Unstaged work is never touched, and nothing outside the staged set is rewritten.
    // Skipped when dependencies are absent so a fresh clone can commit before `pnpm i`.
    const formatting = hasDependencies()
    if (formatting) {
      execFileSync(process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm', ['exec', 'nano-staged'], {
        stdio: 'inherit',
      })
    }
    execFileSync('git', ['diff', '--cached', '--check'], { stdio: 'inherit' })
    const files = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'])
      .toString()
      .split('\0')
      .filter(Boolean)
    for (const file of files.filter((file) => file.endsWith('.json'))) {
      try {
        JSON.parse(execFileSync('git', ['show', `:${file}`], { maxBuffer: 64 * 1024 * 1024 }).toString())
      } catch (error) {
        throw new Error(`Invalid staged JSON: ${file}`, { cause: error })
      }
    }
    console.log(
      formatting
        ? 'Staged files formatted; whitespace, conflict markers, and JSON: OK. Full quality runs in PR CI.'
        : 'Dependencies not installed; skipped staged formatting. Whitespace, conflict markers, and JSON: OK.',
    )
  } else if (mode === 'commit-msg') {
    checkMessage(readFileSync(messageFile, 'utf8'))
  } else {
    throw new Error(`Unknown hook mode: ${mode}`)
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    run(process.argv[2], process.argv[3])
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
