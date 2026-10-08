import { spawn } from 'node:child_process'
import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { build } from 'vite'

const root = resolve(import.meta.dirname, '..')
const runTypes = () =>
  new Promise((done, fail) => {
    const child = spawn('vue-tsc', ['-p', 'tsconfig.build.json'], { cwd: root, stdio: 'inherit' })
    child.on('error', fail)
    child.on('exit', (code) => (code === 0 ? done() : fail(new Error(`vue-tsc exited with ${code}`))))
  })

await Promise.all(['es', 'lib', 'types'].map((dir) => rm(resolve(root, dir), { recursive: true, force: true })))

const modules = (format, outDir, extension) =>
  build({
    root,
    configFile: false,
    logLevel: 'warn',
    plugins: [vue()],
    build: {
      copyPublicDir: false,
      emptyOutDir: false,
      minify: false,
      outDir,
      rollupOptions: {
        input: resolve(root, 'src/index.ts'),
        external: ['vue'],
        preserveEntrySignatures: 'strict',
        output: {
          format,
          preserveModules: true,
          preserveModulesRoot: resolve(root, 'src'),
          entryFileNames: `[name].${extension}`,
          exports: 'named',
        },
      },
    },
  })

await Promise.all([modules('es', 'es', 'mjs'), modules('cjs', 'lib', 'cjs'), runTypes()])
