import { execFile } from 'node:child_process'
import { relative, resolve } from 'node:path'
import { promisify } from 'node:util'
import { downlevelVueDeclarations, normalizeVueTypeFiles } from '@sparknest/ui-build-vue'
import fse from 'fs-extra'
import ts from 'typescript-js'
import { getMapleConfig } from '../config/maple.config.js'
import { CWD, SRC_DIR } from '../shared/constant.js'
import { getPublicDirs } from '../shared/fsUtils.js'
import { compileStyleVars } from './compileStyleVars.js'
import { copySourceDeclarations } from './copySourceDeclarations.js'
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
  await compileStyleVars()
  // This directory contains generated artifacts only; stale renamed components must not survive builds.
  await fse.emptyDir(declarationsDir)
  await promisify(execFile)('tsc', ['--runExternalCode', '-p', 'tsconfig.declaration.json'], {
    cwd: CWD,
    env: { ...process.env, VUE_CONTENT_MAPPER_WORKERS: process.env.VUE_CONTENT_MAPPER_WORKERS ?? '1' },
    maxBuffer: 16 * 1024 * 1024,
  })
  await normalizeVueTypeFiles(declarationsDir)
  await copySourceDeclarations(SRC_DIR, declarationsDir)
  const { namespace = 'mp', directives = [] } = await getMapleConfig()
  const lines: string[] = []
  const nonComponents = new Set(['_ContextComponent', '_LocaleComponent', '_ThemesComponent', '_LoadingBarComponent'])
  for (const dir of await getPublicDirs()) {
    for (const token of await exportedComponentTokens(dir)) {
      // Loading exports both a Vue component and a directive; Hover exports a child component.
      if (
        !token.endsWith('Component') ||
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
  downlevelVueDeclarations(CWD, 'types-generated', ts)
}
