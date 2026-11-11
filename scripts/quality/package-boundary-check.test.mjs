import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { auditPackages, validateDependency, validatePackageName } from './package-boundary-check.mjs'

const framework = 'vue'
const other = 'react'
function fixture(t, change = {}) {
  const root = mkdtempSync(join(tmpdir(), 'package-boundary-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  function put(path, value) {
    const file = join(root, path)
    mkdirSync(join(file, '..'), { recursive: true })
    writeFileSync(file, typeof value === 'string' ? value : JSON.stringify(value))
  }
  put('package.json', { name: `@cedar-design/workspace-${framework}`, private: true, ...change })
  put('packages/ui/package.json', { name: `@cedar-design/ui-${framework}` })
  return { root, put }
}
test('public and private names identify their framework', () => {
  validatePackageName(`@cedar-design/ui-${framework}`, 'fixture')
  assert.throws(() => validatePackageName('@cedar-design/ui', 'fixture'), /must identify/)
  assert.throws(() => validateDependency(`@cedar-design/ui-${other}`, 'fixture'), /internal dependency/)
  assert.throws(() => validateDependency(other, 'fixture'), /cross-framework/)
  assert.throws(() => validateDependency('@cedar/ui', 'fixture'), /obsolete package/)
})
test('audits normal workspaces without requiring sibling repositories', (t) => {
  const { root } = fixture(t)
  assert.equal(auditPackages(root).packages, 2)
})
test('rejects a package.json hidden inside an internal source module', (t) => {
  const { root, put } = fixture(t)
  put('packages/ui/docs/.vuepress/plugin/package.json', { name: `internal-plugin-${framework}`, private: true })
  assert.throws(() => auditPackages(root), /Unclassified package.json/)
})
test('rejects duplicate workspace names and direct self dependencies', (t) => {
  const { root, put } = fixture(t)
  put('packages/other/package.json', { name: `@cedar-design/ui-${framework}` })
  assert.throws(() => auditPackages(root), /Duplicate package name/)
  put('packages/other/package.json', {
    name: `@cedar-design/shared-${framework}`,
    devDependencies: { [`@cedar-design/shared-${framework}`]: 'workspace:*' },
  })
  assert.throws(() => auditPackages(root), /depends on itself/)
})
test('rejects missing workspaces and aliases for the opposite framework', (t) => {
  const { root, put } = fixture(t, { dependencies: { [`@cedar-design/missing-${framework}`]: 'workspace:*' } })
  assert.throws(() => auditPackages(root), /missing workspace package/)
  put('package.json', {
    name: `@cedar-design/workspace-${framework}`,
    private: true,
    dependencies: { tool: `npm:@sparknest/ui-build-${other}@1.0.0` },
  })
  assert.throws(() => auditPackages(root), /internal dependency/)
})
test('validates override targets as well as dependency names', (t) => {
  const external = mkdtempSync(join(tmpdir(), 'package-boundary-target-'))
  t.after(() => rmSync(external, { recursive: true, force: true }))
  writeFileSync(join(external, 'package.json'), JSON.stringify({ name: `@sparknest/wrong-${framework}` }))
  const { root } = fixture(t, { pnpm: { overrides: { [`@sparknest/ui-build-${framework}`]: `link:${external}` } } })
  assert.throws(() => auditPackages(root), /Linked package name mismatch/)
})
test('finds multiline and dynamic cross-framework source imports', (t) => {
  const { root, put } = fixture(t)
  put('packages/ui/src/index.ts', `import {\n thing,\n} from '${other}';`)
  assert.throws(() => auditPackages(root), /cross-framework/)
  put('packages/ui/src/index.ts', `export async function load() { return import('${other}') }`)
  assert.throws(() => auditPackages(root), /cross-framework/)
})
test('rejects relative cross-framework tools and missing executable files', (t) => {
  const repo = framework === 'vue' ? 'design-ui-react' : 'design-ui'
  const { root, put } = fixture(t, { scripts: { build: `node ../${repo}/build.mjs` } })
  assert.throws(() => auditPackages(root), /cross-framework repository/)
  put('package.json', { name: `@cedar-design/workspace-${framework}`, private: true, bin: { tool: 'missing.mjs' } })
  assert.throws(() => auditPackages(root), /missing executable/)
})
test('does not treat generated files and captured historical manifests as source packages', (t) => {
  const { root, put } = fixture(t)
  for (const folder of [
    'packages/ui/docs/.vuepress/.temp-build',
    'packages/ui/site',
    'audits/evidence/capture',
    'release/capture',
  ]) {
    put(`${folder}/package.json`, { name: 'old-package' })
  }
  assert.equal(auditPackages(root).packages, 2)
})
if (framework === 'vue') {
  test('classifies the two real project templates and prevents collisions with UI', (t) => {
    const { root, put } = fixture(t, { name: '@maple-design/workspace-vue' })
    const template = 'packages/cli/template/generators/base/package.json'
    put(template, { name: 'maple-library-template-vue' })
    put('packages/ui-playground/src/download/template/package.json', {
      name: 'maple-playground-demo-vue',
      private: true,
    })
    assert.throws(() => auditPackages(root), /Missing template compiler config/)
    put('packages/cli/template/generators/base/ui-build.config.mjs', '')
    put('packages/cli/template/generators/base/tsconfig.declaration.json', {})
    assert.equal(auditPackages(root).templates, 2)
    put('packages/ui-playground/src/download/template/package.json', {
      name: 'maple-playground-demo-vue',
      private: true,
      dependencies: { '@cedar-design/ui-vue': 'workspace:*' },
    })
    assert.throws(() => auditPackages(root), /project template leaks a local dependency/)
    put('packages/ui-playground/src/download/template/package.json', {
      name: 'maple-playground-demo-vue',
      private: true,
    })
    put(template, { name: '@cedar-design/ui-vue' })
    assert.throws(() => auditPackages(root), /Duplicate package name|Template name mismatch/)
  })
}

test('ignores package names shown in comments and ordinary string examples', (t) => {
  const { root, put } = fixture(t)
  put(
    'packages/ui/src/index.ts',
    `// import { x } from '@maple-design/map-core'\nconst example = "import('${other}')";`,
  )
  assert.equal(auditPackages(root).sourceCount, 1)
})

test('checks real SFC script imports and rejects Vue source in React repositories', (t) => {
  const { root, put } = fixture(t)
  put(
    'packages/ui/src/Example.vue',
    `<script setup lang="ts">import {x} from '${framework === 'vue' ? other : framework}'</script><template><div /></template>`,
  )
  assert.throws(() => auditPackages(root), /cross-framework/)
})

test('rejects syntax damage left by directory-name replacements', (t) => {
  const { root, put } = fixture(t)
  put('packages/ui/src/index.mjs', "const pkg = source.'ui';")
  assert.throws(() => auditPackages(root), /source syntax error/)
})
