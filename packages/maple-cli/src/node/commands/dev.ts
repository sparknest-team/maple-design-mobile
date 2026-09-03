import { resolve } from 'path'
import { kebabCase } from '@maplejs/maple-shared'
import chokidar, { FSWatcher } from 'chokidar'
import fse from 'fs-extra'
import { createServer, ViteDevServer } from 'vite'
import { generateEsEntryTemplate, getScriptExtname } from '../compiler/compileScript.js'
import { buildSiteEntry } from '../compiler/compileSiteEntry.js'
import { getMapleConfig, MapleConfig } from '../config/maple.config.js'
import { getDevConfig } from '../config/vite.config.js'
import { ES_DIR, MAPLE_CONFIG, SRC, SRC_DIR } from '../shared/constant.js'
import { getPublicDirs } from '../shared/fsUtils.js'
import logger from '../shared/logger.js'

const { ensureDirSync, pathExistsSync, readFileSync, outputFileSync, removeSync } = fse

let server: ViteDevServer
let watcher: FSWatcher

async function stub(mapleConfig: Required<MapleConfig>) {
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
  // Load global tokens once; keep them out of component SFCs so Vite Less won't inline them N times.
  outputFileSync(resolve(ES_DIR, `style${getScriptExtname()}`), `import '../${SRC}/style/theme/css-variables.less'\n`)
  outputFileSync(esmFile, esmContent)
  outputFileSync(cssFile, cssContent)
}

async function startServer(options: DevCommandOptions) {
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

interface DevCommandOptions {
  force?: boolean
  draft?: boolean
}

export async function dev(options: DevCommandOptions) {
  process.env.NODE_ENV = 'development'

  ensureDirSync(SRC_DIR)
  await startServer(options)
}
