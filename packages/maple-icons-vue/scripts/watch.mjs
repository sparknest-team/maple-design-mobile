import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
let running = false
let queued = false

function generate() {
  if (running) {
    queued = true
    return
  }
  running = true
  const child = spawn('node', ['scripts/generate.mjs'], { cwd: root, stdio: 'inherit' })
  child.on('exit', () => {
    running = false
    if (queued) {
      queued = false
      generate()
    }
  })
}

generate()
chokidar.watch(resolve(root, 'svg'), { ignoreInitial: true }).on('all', generate)
console.log('Watching Maple SVG icons...')
