import fse from 'fs-extra'
import { build as buildVite } from 'vite'
import { buildSiteEntry } from '../compiler/compileSiteEntry.js'
import { getMapleConfig } from '../config/maple.config.js'
import { getBuildConfig } from '../config/vite.config.js'
import { SRC_DIR } from '../shared/constant.js'

const { ensureDirSync } = fse

export async function build() {
  process.env.NODE_ENV = 'production'

  ensureDirSync(SRC_DIR)
  await buildSiteEntry(false)
  const mapleConfig = await getMapleConfig()
  const buildConfig = getBuildConfig(mapleConfig)

  await buildVite(buildConfig)
}
