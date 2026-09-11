import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pascalCase } from '@maplejs/maple-shared'
import ts from 'typescript'
import { SRC_DIR } from '../shared/constant.js'
import { getPublicDirs, getVersion } from '../shared/fsUtils.js'

// Follow exports rather than scraping type names: re-exports and child Props count too.
function publicContractExports(dirs: string[]) {
  const entries = dirs
    .map((dir) => INDEX_FILES.map((file) => resolve(SRC_DIR, dir, file)).find(existsSync))
    .filter((file): file is string => Boolean(file))
  const program = ts.createProgram(entries, {
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    jsx: ts.JsxEmit.Preserve,
    skipLibCheck: true,
  })
  const checker = program.getTypeChecker()
  const used = new Set<string>(['LoadingDirectiveOptions', ...dirs.map(pascalCase)])
  return entries.flatMap((file) => {
    const source = program.getSourceFile(file)
    const symbol = source && checker.getSymbolAtLocation(source)
    if (!symbol) {
      return []
    }
    const runtime: string[] = [],
      types: string[] = []
    for (const exported of checker.getExportsOfModule(symbol)) {
      const name = exported.name
      if (used.has(name)) {
        continue
      }
      const original = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported
      if (/^[a-z].*Props$/.test(name)) {
        runtime.push(name)
        used.add(name)
      } else if (original.flags & ts.SymbolFlags.Type && /^[A-Z]/.test(name) && !['Props', 'Instance'].includes(name)) {
        types.push(name)
        used.add(name)
      }
    }
    const dir = dirs.find((dir) => INDEX_FILES.some((index) => resolve(SRC_DIR, dir, index) === file))!
    return [
      runtime.length ? `export { ${runtime.join(', ')} } from './${dir}'` : '',
      types.length ? `export type { ${types.join(', ')} } from './${dir}'` : '',
    ].filter(Boolean)
  })
}

const INDEX_FILES = ['index.ts', 'index.tsx', 'index.js']

export async function exportedComponentTokens(dir: string) {
  for (const file of INDEX_FILES) {
    const path = resolve(SRC_DIR, dir, file)
    if (!existsSync(path)) {
      continue
    }
    const source = await readFile(path, 'utf8')
    const dirName = pascalCase(dir)
    const aliases = [...source.matchAll(/export const (_[A-Za-z0-9]+Component)/g)].map((match) => match[1])
    const named = [...source.matchAll(/export \{([^}]+)\}/g)]
      .flatMap((match) => match[1].split(','))
      .map((part) =>
        part
          .trim()
          .split(/\s+as\s+/)[0]
          .trim(),
      )
      .filter((name) => /^[A-Z]/.test(name) && name !== dirName && !name.endsWith('Props'))
    const tokens = [...new Set([...named, ...aliases])]
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

export interface MapleLibrary {
  version: string
  install: typeof install
  ${publicComponents.map((name) => `${name}: typeof ${name}`).join('\n  ')}
}
const library: MapleLibrary = {
  version,
  install,
  ${publicComponents.join(',\n  ')}
}
export default library
`

  const index = `\
export { default, version, install, ${publicComponents.join(', ')} } from './maple-vue'
${tokenExports.join('\n')}
export { vLoading } from './loading'
export type { LoadingDirectiveOptions } from './loading'
export { imagePreview } from './image'
${publicContractExports(publicDirs).join('\n')}
export type { PopupContainer } from './utils/popup-container'
`

  await writeFile(resolve(SRC_DIR, 'maple-vue.ts'), mapleVue)
  await writeFile(resolve(SRC_DIR, 'index.ts'), index)
}
