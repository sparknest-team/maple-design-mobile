import { resolve } from 'path'
import { kebabCase } from '@maplejs/maple-shared'
import chokidar from 'chokidar'
import fse from 'fs-extra'
import { createServer } from 'vite'
import { generateEsEntryTemplate, getScriptExtname } from '../compiler/compileScript.js'
import { buildSiteEntry } from '../compiler/compileSiteEntry.js'
import { getMapleConfig } from '../config/maple.config.js'
import { getDevConfig } from '../config/vite.config.js'
import { ES_DIR, MAPLE_CONFIG, SRC, SRC_DIR } from '../shared/constant.js'
import { getPublicDirs } from '../shared/fsUtils.js'
import logger from '../shared/logger.js'

const { ensureDirSync, pathExistsSync, readFileSync, outputFileSync, removeSync } = fse
let server
let watcher
async function stub(mapleConfig) {
  const name = kebabCase(mapleConfig?.name || '')
  // keep esm and css file for playground
  const esmFile = resolve(ES_DIR, `${name}.esm.js`)
  const cssFile = resolve(ES_DIR, `${name}.css`)
  const esmContent = pathExistsSync(esmFile) ? readFileSync(esmFile, 'utf-8') : ''
  const cssContent = pathExistsSync(cssFile) ? readFileSync(cssFile, 'utf-8') : ''
  removeSync(ES_DIR)
  const { indexTemplate } = generateEsEntryTemplate({
    publicDirs: await getPublicDirs(),
    root: `../${SRC}/`,
    scriptExtname: '',
  })
  outputFileSync(resolve(ES_DIR, `index${getScriptExtname()}`), indexTemplate)
  outputFileSync(resolve(ES_DIR, `style${getScriptExtname()}`), '')
  outputFileSync(esmFile, esmContent)
  outputFileSync(cssFile, cssContent)
}
async function startServer(options) {
  const mapleConfig = await getMapleConfig()
  const isRestart = Boolean(server)
  logger.info(`${isRestart ? 'Res' : 'S'}tarting server...`)
  // close all instance
  server && (await server.close())
  watcher && (await watcher.close())
  // stub library index
  await stub(mapleConfig)
  // build all config
  await buildSiteEntry(options.draft ?? false)
  const devConfig = getDevConfig(mapleConfig)
  const inlineConfig = {
    ...devConfig,
    ...(options.force ? { optimizeDeps: { force: true } } : {}),
  }
  // create all instance
  server = await createServer(inlineConfig)
  await server.listen()
  server.printUrls()
  if (pathExistsSync(MAPLE_CONFIG)) {
    watcher = chokidar.watch(MAPLE_CONFIG)
    watcher.on('change', () => startServer(options))
  }
  logger.success(`\n${isRestart ? 'Res' : 'S'}tart successfully!!!`)
  if (options.draft) {
    logger.title('Server in draft mode!!!')
  }
}
export async function dev(options) {
  process.env.NODE_ENV = 'development'
  ensureDirSync(SRC_DIR)
  await startServer(options)
}
