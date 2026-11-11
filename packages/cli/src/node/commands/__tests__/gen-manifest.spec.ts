// @vitest-environment node
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createGeneratedManifest } from '../gen'

const template = JSON.parse(
  readFileSync(new URL('../../../../template/generators/base/package.json', import.meta.url), 'utf8'),
)

describe('generated component library manifest', () => {
  it.each(['my-ui-vue', '@example-design/ui-vue'])(
    'uses the requested name %s without modifying the template',
    (name) => {
      const generated = createGeneratedManifest(template, name, '1.2.3')
      expect(generated.name).toBe(name)
      expect(generated.devDependencies['@maple-design/ui-vue']).toBe('^1.2.3')
      expect(generated.name).not.toBe('@maple-design/ui-vue')
      expect(template.name).toBe('maple-library-template-vue')
      expect(template.devDependencies['@maple-design/ui-vue']).toBe('workspace:*')
    },
  )

  it.each(['@maple-design/ui-vue', '@maple-design/shared-vue', 'vue'])(
    'rejects a project named like a dependency: %s',
    (name) => {
      expect(() => createGeneratedManifest(template, name, '1.2.3')).toThrow(/conflicts with a template dependency/)
    },
  )

  it.each(['My Components', '../my-ui'])('rejects an invalid npm package name: %s', (name) => {
    expect(() => createGeneratedManifest(template, name, '1.2.3')).toThrow(/Invalid npm project name/)
  })

  it('replaces workspace dependencies with installable versions and keeps unrelated dependencies', () => {
    const generated = createGeneratedManifest(template, 'my-ui-vue', '1.2.3')
    expect(Object.values(generated.devDependencies).some((version) => version.startsWith('workspace:'))).toBe(false)
    expect(generated.devDependencies.vue).toBe(template.devDependencies.vue)
    expect(generated.dependencies?.['@maple-design/shared-vue']).toBe('^1.2.3')
    expect(generated.files).toEqual(['es', 'lib', 'umd', 'highlight', 'types', 'types-generated'])
  })
})
