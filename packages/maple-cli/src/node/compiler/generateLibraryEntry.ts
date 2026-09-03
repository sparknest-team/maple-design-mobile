import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pascalCase } from '@maplejs/maple-shared'
import { SRC_DIR } from '../shared/constant.js'
import { getPublicDirs, getVersion } from '../shared/fsUtils.js'

const INDEX_FILES = ['index.ts', 'index.tsx', 'index.js']

async function exportedComponentTokens(dir: string) {
  for (const file of INDEX_FILES) {
    const path = resolve(SRC_DIR, dir, file)
    if (!existsSync(path)) {
      continue
    }
    const source = await readFile(path, 'utf8')
    const tokens = [...source.matchAll(/export const (_[A-Za-z0-9]+Component)/g)].map((match) => match[1])
    if (tokens.length) {
      return tokens
    }
  }
  return [`_${pascalCase(dir)}Component`]
}

export async function generateLibraryEntry() {
  const publicDirs = (await getPublicDirs()).filter((dir) => dir !== 'index')
  const publicComponents = publicDirs.map((dir) => pascalCase(dir))
  const imports = publicDirs.map((dir, index) => `import ${publicComponents[index]} from './${dir}'`)
  const version = getVersion()
  const tokenExports = await Promise.all(
    publicDirs.map(async (dir) => {
      const tokens = await exportedComponentTokens(dir)
      return `export { ${tokens.join(', ')} } from './${dir}'`
    }),
  )

  const mapleVue = `\
import type { App } from 'vue'
${imports.join('\n')}

export const version = '${version}'

function install(app: App) {
  const plugins = [${publicComponents.join(', ')}]
  for (const plugin of plugins) {
    if (plugin && typeof (plugin as { install?: unknown }).install === 'function') {
      app.use(plugin as { install: (app: App) => void })
    }
  }
}

export {
  install,
  ${publicComponents.join(',\n  ')}
}

export default {
  version,
  install,
  ${publicComponents.join(',\n  ')}
}
`

  const index = `\
export { default, version, install, ${publicComponents.join(', ')} } from './maple-vue'
${tokenExports.join('\n')}
export { imagePreview } from './image'
`

  await writeFile(resolve(SRC_DIR, 'maple-vue.ts'), mapleVue)
  await writeFile(resolve(SRC_DIR, 'index.ts'), index)
}
