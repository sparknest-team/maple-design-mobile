import fs from 'fs'
import { fileURLToPath, URL } from 'node:url'
import { build, defineConfig, Plugin } from 'vite'

function toPath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}

function copyMapleDependencies(): Plugin {
  return {
    name: 'copy-maple-dependencies',

    async buildStart() {
      // The package ESM entry has external dependencies and CSS imports. The
      // browser REPL needs a standalone module with only Vue left external.
      await build({
        configFile: false,
        publicDir: false,
        logLevel: 'warn',
        build: {
          outDir: toPath('./public'),
          emptyOutDir: false,
          lib: {
            entry: toPath('../maple-ui/es/index.mjs'),
            formats: ['es'],
            fileName: () => 'maple.esm.js',
            cssFileName: 'maple',
          },
          rollupOptions: { external: ['vue'] },
        },
      })
      fs.copyFileSync(toPath('../maple-touch-emulator/iife.js'), toPath('./public/maple-touch-emulator.js'))
      fs.copyFileSync(toPath('../maple-ui/es/maple.css'), toPath('./public/maple.css'))
      fs.writeFileSync(
        toPath('./public/maple-area.js'),
        `export default ${fs.readFileSync(toPath('../maple-ui/json/area.json'))}`,
      )
    },
  }
}

export default defineConfig({
  base: './',

  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  optimizeDeps: {
    exclude: ['@vue/repl'],
  },

  build: {
    outDir: 'site',
  },

  define: {
    __APP_ENABLE_PREVIEW__: process.env.ENABLE_PREVIEW,
  },

  plugins: [copyMapleDependencies()],
})
