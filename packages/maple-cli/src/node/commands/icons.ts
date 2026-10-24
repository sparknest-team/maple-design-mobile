import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import logger from '../shared/logger.js'

export interface IconsCommandOptions {
  watch?: boolean
}

function run(command: string, args: string[], cwd: string) {
  return new Promise<void>((done, fail) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
    child.on('error', fail)
    child.on('exit', (code) => (code === 0 ? done() : fail(new Error(`${command} exited with code ${code}`))))
  })
}

export async function icons({ watch = false }: IconsCommandOptions = {}) {
  const packageRoot = resolve(process.cwd(), 'packages/maple-icons-vue')
  logger.info(`${watch ? 'Watching' : 'Building'} @maple-design/icons-vue...`)
  await run('pnpm', ['--dir', packageRoot, watch ? 'dev' : 'build'], process.cwd())
}
