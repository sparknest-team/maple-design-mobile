import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { x } from 'tinyexec'
import { SITE_OUTPUT_PATH } from '../shared/constant.js'

const hasVuepressSite = () => ['ts', 'mjs', 'js'].some((ext) => existsSync(resolve('docs/.vuepress/config.' + ext)))

async function runVuepress(command: 'dev' | 'build', options: string[] = []) {
  if (!hasVuepressSite()) {
    throw new Error(
      'Expected a VuePress config at docs/.vuepress/config.{ts,mjs,js}. Run this command from the documentation project.',
    )
  }
  const require = createRequire(resolve('package.json'))
  const cli = require.resolve('vuepress/bin')
  await x(process.execPath, [cli, command, 'docs', ...options], {
    nodeOptions: { stdio: 'inherit' },
    throwOnError: true,
  })
}

export function dev({ force = false }: { force?: boolean } = {}) {
  return runVuepress('dev', force ? ['--clean-cache'] : [])
}

export function build() {
  return runVuepress('build', ['--dest', SITE_OUTPUT_PATH])
}
