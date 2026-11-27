import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, realpath, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const cli = fileURLToPath(new URL('../../packages/cli/bin/cli.mjs', import.meta.url))

test('documentation commands dispatch only to the project VuePress installation', async () => {
  const cwd = await mkdtemp(join(tmpdir(), 'maple-vuepress-'))
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' })
  try {
    assert.match(run('build').stderr, /docs\/\.vuepress\/config/)
    assert.match(run('dev', '--draft').stderr, /unknown option/)
    const docs = join(cwd, 'docs/.vuepress')
    const vuepress = join(cwd, 'node_modules/vuepress')
    await mkdir(docs, { recursive: true })
    await mkdir(vuepress, { recursive: true })
    await writeFile(join(docs, 'config.ts'), 'export default {}')
    await writeFile(join(vuepress, 'package.json'), JSON.stringify({ exports: { './bin': './bin.cjs' } }))
    await writeFile(join(vuepress, 'bin.cjs'), 'console.log(JSON.stringify(process.argv.slice(2)))')
    for (const [args, expected] of [
      [
        ['dev', '--force'],
        ['dev', 'docs', '--clean-cache'],
      ],
      [['build'], ['build', 'docs', '--dest', join(await realpath(cwd), 'site')]],
    ]) {
      const result = run(...args)
      assert.equal(result.status, 0, result.stderr)
      const actual = JSON.parse(result.stdout)
      assert.deepEqual(actual, expected)
    }
  } finally {
    await rm(cwd, { recursive: true, force: true })
  }
})
