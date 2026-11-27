import { extname, resolve } from 'path'
import { fileURLToPath } from 'url'
import fse from 'fs-extra'
import { CLI_PACKAGE_JSON, PUBLIC_DIR_INDEXES, SRC_DIR, UI_PACKAGE_JSON } from './constant.js'

export { glob } from 'glob'

const { ensureFileSync, lstatSync, outputFileSync, pathExistsSync, readdir, readFileSync, readJSONSync } = fse

export async function getPublicDirs(): Promise<string[]> {
  const srcDir: string[] = await readdir(SRC_DIR)
  return srcDir.filter((filename: string) => isPublicDir(resolve(SRC_DIR, filename)))
}

export const isMD = (file: string): boolean => pathExistsSync(file) && extname(file) === '.md'

export const isDir = (file: string): boolean => pathExistsSync(file) && lstatSync(file).isDirectory()

const isPublicDir = (dir: string): boolean => PUBLIC_DIR_INDEXES.some((index) => pathExistsSync(resolve(dir, index)))

export function outputFileSyncOnChange(path: string, code: string) {
  ensureFileSync(path)
  const content = readFileSync(path, 'utf-8')
  if (content !== code) {
    outputFileSync(path, code)
  }
}

export function getDirname(url: string) {
  return fileURLToPath(new URL('.', url))
}

export function getVersion() {
  return readJSONSync(UI_PACKAGE_JSON).version
}

export function getCliVersion() {
  return readJSONSync(CLI_PACKAGE_JSON).version
}
