import { relative, resolve } from 'path'
import chokidar, { FSWatcher } from 'chokidar'
import fse from 'fs-extra'
import { createServer, ViteDevServer } from 'vite'
import { buildSiteEntry } from '../compiler/compileSiteEntry.js'
import { getMapleConfig } from '../config/maple.config.js'
import { getDevConfig } from '../config/vite.config.js'
import { COMPONENT_REUSE_JSON, MAPLE_CONFIG, SITE, SITE_DIR, SRC_DIR } from '../shared/constant.js'
import logger from '../shared/logger.js'

const { ensureDirSync, pathExistsSync } = fse

let server: ViteDevServer
let watcher: FSWatcher
let siteWatcher: FSWatcher

async function startServer(options: DevCommandOptions) {
  const mapleConfig = await getMapleConfig()
  const isRestart = Boolean(server)
  logger.info(`${isRestart ? 'Res' : 'S'}tarting server...`)

  // close all instance
  server && (await server.close())
  watcher && (await watcher.close())
  siteWatcher && (await siteWatcher.close())

  // Dev resolves components and styles from src; never rewrite published es/lib artifacts.

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

  const watchFiles = [MAPLE_CONFIG, COMPONENT_REUSE_JSON].filter((file) => pathExistsSync(file))
  if (watchFiles.length) {
    watcher = chokidar.watch(watchFiles)
    watcher.on('change', () => startServer(options))
  }

  // Vite serves the generated .maple/site copy, so edits to the CLI's site
  // source must be mirrored into that copy for normal HMR to observe them.
  siteWatcher = chokidar.watch(SITE, { ignoreInitial: true })
  siteWatcher.on('add', syncSiteFile)
  siteWatcher.on('change', syncSiteFile)

  logger.success(`\n${isRestart ? 'Res' : 'S'}tart successfully!!!`)

  if (options.draft) {
    logger.title('Server in draft mode!!!')
  }
}

async function syncSiteFile(source: string) {
  await fse.copy(source, resolve(SITE_DIR, relative(SITE, source)))
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
