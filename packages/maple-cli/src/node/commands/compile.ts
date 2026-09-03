import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildLibrary } from '@loca/ui-build'
import fse from 'fs-extra'
import { createSpinner } from 'nanospinner'
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
    process.exitCode = 1
  }
}

export async function compile() {
  process.env.NODE_ENV = 'compile'
  await removeDir()

  await runTask('library entry', generateLibraryEntry)
  await Promise.all([runTask('types', compileTypes), runTask('template highlight', compileTemplateHighlight)])

  const configUrl = pathToFileURL(resolve(process.cwd(), 'ui-build.config.mjs')).href
  const configModule = await import(`${configUrl}?t=${Date.now()}`)
  await runTask('module', () => buildLibrary(configModule.default))
  if (process.exitCode && process.exitCode !== 0) {
    return
  }
  generateReference(ES_DIR)
  generateReference(LIB_DIR)
}
