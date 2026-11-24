import { spawnSync } from 'node:child_process'

export async function changedComponents() {
  const base = process.env.DOCS_COMPONENTS_BASE || (process.env.DOCS_COMPONENTS_PR ? 'HEAD^1' : '')
  // Linked changes may alter shared code across both component libraries.
  if (!base || (process.env.DOCS_COMPONENTS_LINKS || '[]') !== '[]') {
    return []
  }

  const diff = spawnSync('git', ['diff', '--name-only', '--no-renames', '-z', '--end-of-options', base, 'HEAD', '--'], {
    encoding: 'utf8',
  })
  if (diff.status !== 0) {
    return []
  }

  const components = new Set()
  for (const path of diff.stdout.split('\0').filter(Boolean)) {
    const match = /^packages\/ui\/src\/([a-z0-9-]+)\//.exec(path)
    if (!match) {
      return []
    }
    components.add(match[1])
  }
  if (!components.size) {
    return []
  }

  const { componentPages } = await import('../../../design-ui/browser/inventory.mjs')
  const pages = new Set(componentPages(process.cwd(), 'maple').map((page) => page.component))
  return [...components].every((component) => pages.has(component)) ? [...components].sort() : []
}
