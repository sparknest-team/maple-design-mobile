import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const cliRoot = fileURLToPath(new URL('../../packages/maple-cli/', import.meta.url))

test('clean workspace links the real CLI bootstrap before generated lib exists', async () => {
  const manifest = JSON.parse(await readFile(resolve(cliRoot, 'package.json'), 'utf8'))
  assert.equal(manifest.bin['maple-cli'], './bin/maple-cli.mjs')
  assert.ok(manifest.files.includes('bin'), 'published package must retain the bootstrap')
  const bootstrap = await readFile(resolve(cliRoot, manifest.bin['maple-cli']), 'utf8')
  const directory = await mkdtemp(resolve(tmpdir(), 'maple-cli-clean-bin-'))
  const run = (args) => {
    // Reuse the quality command's package manager, not an unrelated global pnpm.
    const manager = process.env.npm_execpath
    const result = spawnSync(manager ? process.execPath : 'pnpm', manager ? [manager, ...args] : args, {
      cwd: directory,
      encoding: 'utf8',
      timeout: 60_000,
    })
    assert.equal(result.error, undefined)
    assert.equal(result.status, 0, result.stdout + result.stderr)
    return result.stdout
  }
  try {
    await mkdir(resolve(directory, 'packages/cli/bin'), { recursive: true })
    await mkdir(resolve(directory, 'packages/consumer'), { recursive: true })
    await writeFile(resolve(directory, 'package.json'), JSON.stringify({ private: true }))
    await writeFile(resolve(directory, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n')
    await writeFile(
      resolve(directory, 'packages/cli/package.json'),
      JSON.stringify({ name: manifest.name, version: manifest.version, type: 'module', bin: manifest.bin }),
    )
    await writeFile(resolve(directory, 'packages/cli/bin/maple-cli.mjs'), bootstrap)
    await writeFile(
      resolve(directory, 'packages/consumer/package.json'),
      JSON.stringify({ name: 'consumer', private: true, dependencies: { [manifest.name]: 'workspace:*' } }),
    )
    run(['install', '--offline', '--lockfile-only'])
    run(['install', '--offline', '--frozen-lockfile'])
    assert.ok(!existsSync(resolve(directory, 'packages/cli/lib')), 'install must not manufacture build output')
    assert.ok(existsSync(resolve(directory, 'packages/consumer/node_modules/.bin/maple-cli')))
    await mkdir(resolve(directory, 'packages/cli/lib/node'), { recursive: true })
    await writeFile(resolve(directory, 'packages/cli/lib/node/bin.js'), "console.log('compiled-cli-reached')\n")
    assert.match(run(['--dir', 'packages/consumer', 'exec', 'maple-cli', '--version']), /compiled-cli-reached/)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
