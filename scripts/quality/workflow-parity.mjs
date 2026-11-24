import { readFileSync } from 'node:fs'

function readField(lines, key, indent) {
  const prefix = `${' '.repeat(indent)}${key}:`
  const value = lines
    .find((line) => line.startsWith(prefix))
    ?.slice(prefix.length)
    .trim()
  return value?.replace(/\s+#.*$/, '').replace(/^(['"])(.*)\1$/, '$2')
}

function collectEnvironment(filename) {
  const source = readFileSync(new URL(`../../.github/workflows/${filename}`, import.meta.url), 'utf8')
  const jobs = source.match(/^jobs:[^\S\n]*\n((?:[ \t][^\n]*\n?|\n)*)/m)?.[1] ?? ''
  const environment = new Set()

  // These workflows use two-space indentation for jobs and block-style step lists.
  for (const job of jobs.split(/^ {2}[\w-]+:[^\S\n]*$/m).slice(1)) {
    const steps = job.match(/^ {4}steps:[^\S\n]*\n((?: {6}[^\n]*\n?| *\n)*)/m)?.[1]
    if (!steps) {
      continue
    }

    const jobDefaults = job.match(/^ {4}defaults:[^\S\n]*\n {6}run:[^\S\n]*\n((?: {8}[^\n]*\n?)*)/m)?.[1]
    const defaultDirectory = readField(jobDefaults?.split('\n') ?? [], 'working-directory', 8) || '.'

    for (const step of steps.split(/^ {6}- /m).slice(1)) {
      const lines = `        ${step}`.split('\n')
      const action = readField(lines, 'uses', 8)?.split('@')[0]
      if (action === 'actions/checkout') {
        const repository = readField(lines, 'repository', 10) || '${{ github.repository }}'
        const path = readField(lines, 'path', 10) || '.'
        environment.add(`checkout ${repository} (path: ${path})`)
      }
      if (action === 'pnpm/action-setup') {
        const version = readField(lines, 'version', 10) || '(未设置)'
        environment.add(`pnpm/action-setup version: ${version}`)
      }
      if (action === 'actions/setup-node') {
        const file = readField(lines, 'node-version-file', 10) || '(未设置)'
        environment.add(`actions/setup-node node-version-file: ${file}`)
      }

      const run = readField(lines, 'run', 8)
      const block = lines.join('\n').match(/^ {8}run: [|>][-+]?\s*\n((?: {10}[^\n]*\n?)*)/m)?.[1]
      const directory = readField(lines, 'working-directory', 8) || defaultDirectory
      for (const command of (block || run || '').split(/\n|&&|;/)) {
        const install = command
          .trim()
          .match(/^(corepack\s+)?pnpm\s+(?:(--config\.frozen-lockfile=(?:true|false))\s+)?install(?=\s|$)(.*)$/)
        if (install) {
          const frozen = [install[2], ...install[3].trim().split(/\s+/)]
            .filter((flag) =>
              /^(?:--(?:no-)?frozen-lockfile(?:=(?:true|false))?|--config\.frozen-lockfile=(?:true|false))$/.test(
                flag ?? '',
              ),
            )
            .at(-1)
          const lockfileFlag = frozen
            ?.replace(/^(?:--config\.)?frozen-lockfile=true$|^--frozen-lockfile=true$/, '--frozen-lockfile')
            .replace(/^--(?:config\.)?frozen-lockfile=false$/, '--no-frozen-lockfile')
          const launcher = install[1] ? 'corepack pnpm' : 'pnpm'
          environment.add(
            `install (working-directory: ${directory}, run: ${launcher} install${lockfileFlag ? ` ${lockfileFlag}` : ''})`,
          )
        }
      }
    }
  }

  if (!environment.size) {
    throw new Error(`${filename} 未解析到环境准备项`)
  }

  return environment
}

const required = collectEnvironment('quality.yml')
const published = collectEnvironment('publish.yml')
let failures = 0

for (const item of required) {
  if (published.has(item)) {
    console.log(`PASS publish.yml 包含 ${item}`)
  } else {
    console.log(`FAIL publish.yml 缺少 ${item}`)
    failures += 1
  }
}

console.log(`汇总：${required.size - failures} PASS，${failures} FAIL（共 ${required.size} 项）`)
if (failures) {
  process.exitCode = 1
}
