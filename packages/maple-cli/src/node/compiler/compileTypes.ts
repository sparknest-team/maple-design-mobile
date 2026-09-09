import { execFile } from 'node:child_process'
import { relative, resolve } from 'node:path'
import { promisify } from 'node:util'
import fse from 'fs-extra'
import { getMapleConfig } from '../config/maple.config.js'
import { CWD, SRC_DIR } from '../shared/constant.js'
import { getPublicDirs } from '../shared/fsUtils.js'
import { compileStyleVars } from './compileStyleVars.js'
import { exportedComponentTokens } from './generateLibraryEntry.js'

const declarationsDir = resolve(CWD, 'types-generated')

export function generateReference(moduleDir: string) {
  const target = relative(moduleDir, declarationsDir).replaceAll('\\', '/')
  fse.writeFileSync(
    resolve(moduleDir, 'index.d.ts'),
    `export * from '${target}'\nexport { default } from '${target}'\n`,
  )
}

// Published declarations derive from the runtime source, not the legacy hand-written Props.
export async function compileTypes() {
  compileStyleVars()
  // This directory contains generated artifacts only; stale renamed components must not survive builds.
  await fse.emptyDir(declarationsDir)
  await promisify(execFile)('vue-tsc', ['-p', 'tsconfig.declaration.json'], { cwd: CWD, maxBuffer: 16 * 1024 * 1024 })
  async function copyDeclarations(dir: string) {
    for (const entry of await fse.readdir(dir, { withFileTypes: true })) {
      if (['__tests__', '__demos__', 'example'].includes(entry.name)) {
        continue
      }
      const file = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        await copyDeclarations(file)
      } else if (entry.name.endsWith('.d.ts')) {
        const target = resolve(declarationsDir, relative(SRC_DIR, file))
        await fse.ensureDir(resolve(target, '..'))
        await fse.copyFile(file, target)
      }
    }
  }
  await copyDeclarations(SRC_DIR)
  const { namespace = 'mp', directives = [] } = await getMapleConfig()
  const lines: string[] = []
  const nonComponents = new Set(['_ContextComponent', '_LocaleComponent', '_ThemesComponent', '_LoadingBarComponent'])
  for (const dir of await getPublicDirs()) {
    for (const token of await exportedComponentTokens(dir)) {
      // Loading exports both a Vue component and a directive; Hover exports a child component.
      if (
        nonComponents.has(token) ||
        (directives.includes(dir) &&
          dir !== 'loading' &&
          token.toLowerCase() === `_${dir.replaceAll('-', '')}component`)
      ) {
        continue
      }
      const name = namespace[0].toUpperCase() + namespace.slice(1) + token.slice(1, -'Component'.length)
      lines.push(`    ${name}: typeof import('./index')['${token}']`)
    }
  }
  await fse.writeFile(
    resolve(declarationsDir, 'global.d.ts'),
    `import 'vue'\ndeclare module 'vue' {\n  export interface GlobalComponents {\n${lines.join('\n')}\n  }\n}\n`,
  )
  const entry = resolve(declarationsDir, 'index.d.ts')
  await fse.appendFile(entry, "\nimport './global'\n")
}
