import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pascalCase } from '@maple-design/shared-vue'
import ts from 'typescript-js'
import { SRC_DIR } from '../shared/constant.js'
import { getPublicDirs, getVersion } from '../shared/fsUtils.js'

// Follow exports rather than scraping type names: re-exports and child Props count too.
export function publicContractExports(dirs: string[]) {
  const entries = dirs
    .map((dir) => INDEX_FILES.map((file) => resolve(SRC_DIR, dir, file)).find(existsSync))
    .filter((file): file is string => Boolean(file))
  const optionalExports = [
    { path: 'loading', runtime: ['vLoading'], types: ['LoadingDirectiveOptions'] },
    { path: 'image', runtime: ['imagePreview'], types: [] },
    { path: 'upload', runtime: ['useUploader'], types: [] },
    { path: 'hover', runtime: ['useHoverOverlay'], types: [] },
    { path: 'form', runtime: ['useFormItem', 'useFormErrorDescription'], types: [] },
    { path: 'field-decorator', runtime: ['fieldLoadingModes'], types: [] },
    { path: 'utils/popup-container', runtime: [], types: ['PopupContainer'] },
  ].map((item) => ({
    ...item,
    file: [...INDEX_FILES.map((file) => resolve(SRC_DIR, item.path, file)), resolve(SRC_DIR, `${item.path}.ts`)].find(
      existsSync,
    ),
  }))
  const program = ts.createProgram([...entries, ...optionalExports.flatMap((item) => (item.file ? [item.file] : []))], {
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    jsx: ts.JsxEmit.Preserve,
    skipLibCheck: true,
  })
  const checker = program.getTypeChecker()
  const used = new Set<string>(['LoadingDirectiveOptions', ...dirs.map(pascalCase)])
  const contracts = entries.flatMap((file) => {
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
  for (const item of optionalExports) {
    const source = item.file && program.getSourceFile(item.file)
    const symbol = source && checker.getSymbolAtLocation(source)
    if (!symbol) {
      continue
    }
    const available = new Set(checker.getExportsOfModule(symbol).map((value) => value.name))
    const runtime = item.runtime.filter((name) => available.has(name))
    const types = item.types.filter((name) => available.has(name))
    if (runtime.length) {
      contracts.push(`export { ${runtime.join(', ')} } from './${item.path}'`)
    }
    if (types.length) {
      contracts.push(`export type { ${types.join(', ')} } from './${item.path}'`)
    }
  }
  return contracts
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
      .map((part) => {
        const sides = part.trim().split(/\s+as\s+/)
        return (sides[1] ?? sides[0]).trim()
      })
      .filter((name) => /^[A-Z]/.test(name) && name !== dirName && !name.endsWith('Props'))
    const tokens = [...new Set([...named, ...aliases])]
    if (tokens.length) {
      return tokens
    }
  }
  return [`_${pascalCase(dir)}Component`]
}

async function writeEntry(file: string, content: string) {
  const previous = await readFile(file, 'utf8').catch((error) => {
    if (error.code !== 'ENOENT') {
      throw error
    }
    return undefined
  })
  if (previous !== content) {
    await writeFile(file, content)
  }
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
      app.use(plugin as unknown as { install: (app: App) => void })
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
  // Preserve ESM live bindings: a component entry may be evaluated before the
  // aggregate entry through the development resolver's dependency graph.
  ${publicComponents.map((name) => `get ${name}() { return ${name} }`).join(',\n  ')}
}
export default library
`

  const index = `\
export { default, version, install, ${publicComponents.join(', ')} } from './maple-vue'
${tokenExports.join('\n')}
${publicContractExports(publicDirs).join('\n')}
`

  await writeEntry(resolve(SRC_DIR, 'maple-vue.ts'), mapleVue)
  await writeEntry(resolve(SRC_DIR, 'index.ts'), index)
}
