import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildLibrary } from '@sparknest/ui-build-vue'
import fse from 'fs-extra'
import { createSpinner } from 'nanospinner'
import { x } from 'tinyexec'
import { compileTemplateHighlight } from '../compiler/compileTemplateHighlight.js'
import { compileTypes, generateReference } from '../compiler/compileTypes.js'
import { generateLibraryEntry } from '../compiler/generateLibraryEntry.js'
import { ES_DIR, HL_DIR, LIB_DIR, UMD_DIR } from '../shared/constant.js'
import logger from '../shared/logger.js'

const { remove } = fse

export function removeDir() {
  return Promise.all([remove(ES_DIR), remove(LIB_DIR), remove(HL_DIR), remove(UMD_DIR)])
}

export async function runTask(taskName: string, task: () => any) {
  const s = createSpinner().start({ text: `Compiling ${taskName}` })
  try {
    const start = performance.now()
    await task()
    s.success({ text: `Compilation ${taskName} completed! (${Math.ceil(performance.now() - start)}ms)` })
  } catch (e: any) {
    s.error({ text: `Compilation ${taskName} failed!` })
    logger.error(e.toString())
    throw e
  }
}

export async function compile(configPath = 'ui-build.config.mjs') {
  process.env.NODE_ENV = 'production'
  const configUrl = pathToFileURL(resolve(configPath))
  const { default: config } = await import(configUrl.href)
  await runTask('library entry', generateLibraryEntry)
  if (config.releaseCheck) {
    await x('tsc', ['--runExternalCode', '-p', config.releaseCheck], {
      nodeOptions: { cwd: config.root, stdio: 'inherit' },
      throwOnError: true,
    })
  }
  await removeDir()
  await Promise.all([runTask('types', compileTypes), runTask('template highlight', compileTemplateHighlight)])

  await runTask('module', () => buildLibrary(config))
  generateReference(ES_DIR)
  generateReference(LIB_DIR)
}
