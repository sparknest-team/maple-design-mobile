import { version as vueVersion } from 'vue'
import { Dialog } from '@maple-design/ui-vue'
import { version as mapleVersion } from '@maple-design/ui-vue/package.json'
import { saveAs } from 'file-saver'
import { version as typescriptVersion } from 'typescript/package.json'
import { createDownloadManifest } from './manifest'
import index from './template/index.html?raw'
import main from './template/main.js?raw'
import pkg from './template/package.json?raw'
import readme from './template/README.md?raw'
import config from './template/vite.config.js?raw'

const excludes = ['maple-repl-plugin.js', 'import-map.json', 'tsconfig.json', 'AppWrapper.vue']

export async function downloadProject(store: any) {
  const action = await Dialog.confirm({ title: 'Notice!', message: 'Download project files?' })

  if (action !== 'confirm') {
    return
  }

  const { default: JSZip } = await import('jszip')
  const zip = new JSZip()

  // basic structure
  zip.file('index.html', index)
  const manifest = createDownloadManifest(
    JSON.parse(pkg),
    {
      mapleVersion: store.mapleVersion,
      vueVersion: store.vueVersion,
      typescriptVersion: store.state?.typescriptVersion,
    },
    { mapleVersion, vueVersion, typescriptVersion },
  )
  zip.file('package.json', JSON.stringify(manifest, null, 2))
  zip.file('vite.config.js', config)
  zip.file('README.md', readme)

  // project src
  const src = zip.folder('src')!
  src.file('main.js', main)

  const files = store.getFiles()

  for (const file in files) {
    if (!excludes.includes(file)) {
      const code = files[file]

      src.file(file, code)
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'maple-playground-demo.zip')
}
