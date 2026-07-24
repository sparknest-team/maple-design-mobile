import fs from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { confirm, input, select } from '@inquirer/prompts'
import { program } from 'commander'
import conventionalChangelog from 'conventional-changelog'
import fse from 'fs-extra'
import glob from 'glob'
import { createSpinner } from 'nanospinner'
import pc from 'picocolors'
import semver from 'semver'

const { green, red, yellow } = pc

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Commit Message Regex ──────────────────────────────────────────
// Conventional Commits: type(scope): description
export const COMMIT_MESSAGE_RE =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|release|wip)(\(.+\))?:.{1,}/

// ── Helpers ───────────────────────────────────────────────────────

export function getCommitMessage(gitParams: string): string {
  const message = fs.readFileSync(gitParams, 'utf-8').trim()
  return message
}

export function isVersionCommitMessage(commitMessage: string): boolean {
  return /^v\d+\.\d+\.\d+/.test(commitMessage) || /^chore\(release\):.+/.test(commitMessage)
}

// ── commitLint ────────────────────────────────────────────────────

export interface CommitLintOptions {
  commitMessagePath?: string
  commitMessageRe?: string
  errorMessage?: string
  warningMessage?: string
}

export function commitLint(options: CommitLintOptions) {
  const {
    commitMessagePath,
    commitMessageRe = COMMIT_MESSAGE_RE.source,
    errorMessage = 'Git commit message format error, please use the conventional commit format (feat/fix/docs/etc.)',
    warningMessage = '',
  } = options

  if (!commitMessagePath) {
    console.error(red('commitMessagePath is required'))
    process.exit(1)
  }

  const message = getCommitMessage(commitMessagePath)
  const re = new RegExp(commitMessageRe)

  if (!re.test(message)) {
    if (warningMessage) {
      console.warn(yellow(warningMessage))
    }
    if (errorMessage) {
      console.error(red(errorMessage))
      process.exit(1)
    }
  }
}

// ── changelog ─────────────────────────────────────────────────────

export interface ChangelogOptions {
  releaseCount?: string
  file?: string
}

export async function changelog(options: ChangelogOptions) {
  const { releaseCount = '2', file = 'CHANGELOG.md' } = options

  const changelogPath = path.resolve(file)
  const count = parseInt(releaseCount, 10)

  // Generate changelog from conventional commits
  const content = await generateChangelog({ releaseCount: count })

  // Prepend to existing changelog or create new
  const existing = fse.existsSync(changelogPath) ? await fse.readFile(changelogPath, 'utf-8') : ''

  const header = '# Changelog\n\n'
  const newContent = content + '\n' + existing.replace(/^# Changelog\n\n/, '')

  await fse.writeFile(changelogPath, header + newContent, 'utf-8')
  console.log(green(`✓ Changelog generated at ${changelogPath}`))
}

async function generateChangelog({ releaseCount = 2 }: { releaseCount?: number } = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    conventionalChangelog({
      preset: 'angular',
      releaseCount,
    })
      .on('data', (chunk: Buffer) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
      .on('error', reject)
  })
}

// ── release ───────────────────────────────────────────────────────

export interface ReleaseOptions {
  remote?: string
  task?: () => Promise<void>
}

export async function release(options: ReleaseOptions) {
  const { remote = 'origin', task } = options

  // 1. Run pre-release build task if provided
  if (task) {
    const spinner = createSpinner('Running build tasks...').start()
    try {
      await task()
      spinner.success({ text: 'Build tasks completed' })
    } catch (err) {
      spinner.error({ text: 'Build tasks failed' })
      throw err
    }
  }

  // 2. Determine which packages to release
  const workspaces = await resolveWorkspaces()

  // 3. Let user select version bump type
  const bumpType = await select<'patch' | 'minor' | 'major' | 'custom'>({
    message: 'Select version bump type:',
    choices: [
      { name: 'patch', value: 'patch' },
      { name: 'minor', value: 'minor' },
      { name: 'major', value: 'major' },
      { name: 'custom', value: 'custom' },
    ],
  })

  let version: string
  if (bumpType === 'custom') {
    version = await input({ message: 'Enter new version:' })
  } else {
    const currentVersion = workspaces[0]?.version || '1.0.0'
    version = semver.inc(currentVersion, bumpType)!
  }

  // 4. Update package.json files
  const spinner = createSpinner(`Updating version to ${version}...`).start()
  for (const ws of workspaces) {
    ws.packageJson.version = version
    await fse.writeJson(ws.packageJsonPath, ws.packageJson, { spaces: 2 })
  }
  spinner.success({ text: `Version updated to ${version}` })

  // 5. Generate changelog
  await changelog({ releaseCount: '2' })

  // 6. Git commit, tag, push
  const gitSpinner = createSpinner('Committing and pushing to git...').start()
  try {
    const { exec } = await import('tinyexec')
    await exec('git', ['add', '.'])
    await exec('git', ['commit', '-m', `chore(release): ${version}`])
    await exec('git', ['tag', `v${version}`])
    await exec('git', ['push', remote, '--follow-tags'])
    gitSpinner.success({ text: `Released v${version} to ${remote}` })
  } catch (err) {
    gitSpinner.error({ text: 'Git operations failed' })
    throw err
  }
}

interface WorkspaceInfo {
  name: string
  version: string
  packageJsonPath: string
  packageJson: Record<string, any>
}

async function resolveWorkspaces(): Promise<WorkspaceInfo[]> {
  // Find workspace root
  let dir = path.resolve(__dirname, '../../../../../') // maple-cli/src/node/release -> root
  // Try to find package.json with workspaces
  while (dir !== path.parse(dir).root) {
    const pkgPath = path.join(dir, 'package.json')
    if (fse.existsSync(pkgPath)) {
      const pkg = await fse.readJson(pkgPath)
      if (pkg.workspaces || pkg.name === '@maplejs/maple-cli') {
        break
      }
    }
    dir = path.dirname(dir)
  }

  const rootPkg = await fse.readJson(path.join(dir, 'package.json'))
  const workspacePatterns: string[] = rootPkg.workspaces || []

  const results: WorkspaceInfo[] = []

  for (const pattern of workspacePatterns) {
    // Simple glob pattern resolution
    const dirs = await glob(pattern.replace('*', '').replace(/\*\*/g, '*'), {
      cwd: dir,
      onlyDirectories: true,
    })

    for (const d of dirs) {
      const pkgPath = path.join(dir, d, 'package.json')
      if (fse.existsSync(pkgPath)) {
        const pkg = await fse.readJson(pkgPath)
        if (pkg.name && !pkg.private) {
          results.push({
            name: pkg.name,
            version: pkg.version,
            packageJsonPath: pkgPath,
            packageJson: pkg,
          })
        }
      }
    }
  }

  return results
}
