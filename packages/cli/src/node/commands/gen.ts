import { glob } from 'node:fs/promises'
import { resolve } from 'path'
import { confirm, input, select } from '@inquirer/prompts'
import fse from 'fs-extra'
import { CLI_PACKAGE_JSON, CWD, GENERATORS_DIR } from '../shared/constant.js'
import logger from '../shared/logger.js'

const { copy, pathExistsSync, readFileSync, writeFileSync, rename } = fse

type CodeStyle = 'tsx' | 'sfc'

export interface GenCommandOptions {
  name?: string
  locale?: boolean
  sfc?: boolean
  tsx?: boolean
}

interface GeneratedManifest {
  name: string
  devDependencies: Record<string, string>
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  [key: string]: unknown
}

export function createGeneratedManifest(pkg: GeneratedManifest, name: string, cliVersion: string) {
  if (!/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/.test(name)) {
    throw new Error(`Invalid npm project name: ${name}`)
  }
  const fields = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'] as const
  for (const field of fields) {
    if (Object.hasOwn(pkg[field] ?? {}, name)) {
      throw new Error(`Project name conflicts with a template dependency: ${name}`)
    }
  }
  const generated = { ...pkg, name, files: ['es', 'lib', 'umd', 'highlight', 'types', 'types-generated'] }
  for (const field of fields) {
    const dependencies = pkg[field]
    if (dependencies) {
      generated[field] = Object.fromEntries(
        Object.entries(dependencies).map(([key, version]) => [
          key,
          key.startsWith('@maple-design/') ? `^${cliVersion}` : version,
        ]),
      )
    }
  }
  return generated
}

function syncVersion(name: string) {
  const file = resolve(CWD, name, 'package.json')
  const pkg = JSON.parse(readFileSync(file, 'utf-8'))
  const cliPkg = JSON.parse(readFileSync(CLI_PACKAGE_JSON, 'utf-8'))

  writeFileSync(file, `${JSON.stringify(createGeneratedManifest(pkg, name, cliPkg.version), null, 2)}\n`)
}

export async function gen(options: GenCommandOptions) {
  logger.title('\n📦📦 Generate cli application ! \n')

  const name = options.name
    ? options.name
    : await input({
        message: 'Name of the generate application: ',
        default: 'my-ui-vue',
      })
  const dest = resolve(CWD, name)

  if (pathExistsSync(dest)) {
    logger.error(`${name} already exists and cannot be recreated...`)
    return
  }

  let codeStyle: CodeStyle

  // Determine whether the parameter carries a coding style
  if (options.sfc || options.tsx) {
    codeStyle = options.sfc ? 'sfc' : 'tsx'
  } else {
    const style: CodeStyle = await select({
      message: 'Please select your component library programming format',
      choices: [
        { name: 'sfc', value: 'sfc' },
        { name: 'tsx', value: 'tsx' },
      ],
    })

    codeStyle = style
  }

  const i18n =
    options.locale ??
    (await confirm({
      message: 'Whether to use i18n?',
      default: false,
    }))

  const dirName = i18n ? 'i18n' : 'default'
  const base = resolve(GENERATORS_DIR, 'base')
  const configBase = resolve(GENERATORS_DIR, 'config', dirName, 'base')
  const code = resolve(GENERATORS_DIR, 'config', dirName, codeStyle)

  const template = JSON.parse(readFileSync(resolve(base, 'package.json'), 'utf-8'))
  const cliPkg = JSON.parse(readFileSync(CLI_PACKAGE_JSON, 'utf-8'))
  createGeneratedManifest(template, name, cliPkg.version)

  await copy(base, dest)
  await copy(configBase, dest)
  await copy(code, dest)
  await rename(resolve(dest, '_gitignore'), resolve(dest, '.gitignore'))
  // Use the generated package's public entry in code copied from its documentation.
  for await (const file of glob('src/*/example/**/*.vue', { cwd: dest })) {
    const path = resolve(dest, file)
    const source = readFileSync(path, 'utf8')
    if (source.includes('__LIBRARY_NAME__/')) {
      writeFileSync(path, source.replaceAll('__LIBRARY_NAME__/', name + '/'))
    }
  }
  syncVersion(name)

  logger.success('✨ Application generated successfully!')
  logger.info(`\
  cd ${name}
  git init (Generating .git folder to init git hooks)
  pnpm install
  pnpm dev`)
  logger.success(`\
=======================
  Good luck have fun
=======================\
      `)
}
