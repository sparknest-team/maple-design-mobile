import { reactive, watchEffect } from 'vue'
import { Dialog, Message } from '@maple-design/ui-vue'
import { compileFile, File } from '@vue/repl'
import type { OutputModes, SFCOptions, Store, StoreOptions, StoreState } from '@vue/repl'
import { version as typescriptVersion } from 'typescript/package.json'
import * as defaultCompiler from 'vue/compiler-sfc'
import { atou, utoa } from './utils/encode'
import { usePreviewVersion } from './utils/env'
import { getMaplePackageUrls } from './utils/package-urls'

const imports = {
  '@maple-design/ui-vue': getMaplePackageUrls(usePreviewVersion ? 'preview' : 'latest').module,
  '@maple-design/ui-vue/json/area.json': './maple-area.js',
  zod: 'https://cdn.jsdelivr.net/npm/zod/lib/index.mjs',
  shiki: 'https://esm.sh/shiki@1.0.0',
}

const appFile = 'src/App.vue'
const mapleReplPlugin = 'src/maple-repl-plugin.js'
const welcomeCode = `\
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello Maple!')
</script>

<template>
  <mp-button type="primary">{{ msg }}</mp-button>
</template>
`
const appWrapperFile = 'src/AppWrapper.vue'
const appWrapperCode = `\
<script setup>
import App from './${stripSrcPrefix(appFile)}'
import { installMapleUI } from './${stripSrcPrefix(mapleReplPlugin)}'

const themeState = installMapleUI()
</script>

<template>
  <mp-theme-provider :theme="themeState.theme.value">
    <App />
  </mp-theme-provider>
</template>
`

const importMapFile = 'import-map.json'
const tsconfigFile = 'tsconfig.json'
const tsconfig = {
  compilerOptions: {
    allowJs: true,
    checkJs: true,
    jsx: 'Preserve',
    target: 'ESNext',
    module: 'ESNext',
    moduleResolution: 'Bundler',
    allowImportingTsExtensions: true,
  },
  vueCompilerOptions: {
    target: 3.3,
  },
}

function getMapleReplPluginCode(version: string | 'latest' | 'preview') {
  const { css: mapleCss, touchEmulator: mapleTouchEmulator } = getMaplePackageUrls(version)

  return `\
import MapleUI from '@maple-design/ui-vue'
import { computed, getCurrentInstance, onBeforeUnmount, shallowRef } from 'vue'

const mapleCss = '${mapleCss}'
const mapleTouchEmulator = '${mapleTouchEmulator}'

await appendStyle()

export function installMapleUI() {
  const { parent } = window

  const style = document.createElement('style')
  style.innerHTML = \`
    body {
      min-height: 100vh;
      padding: 16px;
      margin: 0;
      color: var(--mp-sys-color-content-primary);
      background-color: var(--mp-sys-color-surface-page);
    }

    *::-webkit-scrollbar {
      display: none;
    }
  \`
  document.head.appendChild(style)

  const script = document.createElement('script')
  script.src = mapleTouchEmulator
  document.body.appendChild(script)

  const themeMap = {
    defaultLightTheme: MapleUI.Themes.default.light,
    defaultDarkTheme: MapleUI.Themes.default.dark,
    mapleLightTheme: MapleUI.Themes.maple.light,
    mapleDarkTheme: MapleUI.Themes.maple.dark,
    alpsLightTheme: MapleUI.Themes.alps.light,
    fireflyLightTheme: MapleUI.Themes.firefly.light,
    alpsDarkTheme: MapleUI.Themes.alps.dark,
    fireflyDarkTheme: MapleUI.Themes.firefly.dark,
  }

  const themeName = shallowRef(parent.document.documentElement.getAttribute('theme') || 'defaultDarkTheme')
  const theme = computed(() => themeMap[themeName.value] || themeMap.defaultDarkTheme)
  const onThemeMessage = ({ data }) => {
    if (data.action === 'theme-change') themeName.value = data.value
  }
  window.addEventListener('message', onThemeMessage)
  onBeforeUnmount(() => window.removeEventListener('message', onThemeMessage))

  document.addEventListener('click', () => {
    window.parent.document.dispatchEvent(new Event('click'))
  })

  const instance = getCurrentInstance()
  instance.appContext.app.use(MapleUI)
  return { theme }
}

export function appendStyle() {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = mapleCss
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })
}`
}

export class ReplStore implements Store {
  customElement = false

  state: StoreState

  vueVersion?: string

  mapleVersion?: string

  compiler = defaultCompiler

  options?: SFCOptions

  initialShowOutput: boolean

  initialOutputMode: OutputModes = 'preview'

  private defaultVueRuntimeURL: string

  private defaultVueServerRendererURL: string

  private pendingCompiler: Promise<any> | null = null

  constructor({
    serializedState = '',
    defaultVueRuntimeURL = `https://cdn.jsdelivr.net/npm/@vue/runtime-dom/dist/runtime-dom.esm-browser.js`,
    defaultVueServerRendererURL = `https://cdn.jsdelivr.net/npm/@vue/server-renderer/dist/server-renderer.esm-browser.js`,
    showOutput = false,
    outputMode = 'preview',
  }: StoreOptions = {}) {
    const files: StoreState['files'] = {}

    if (serializedState) {
      const saved = JSON.parse(atou(serializedState))

      for (const filename in saved) {
        setFile(
          files,
          filename,
          saved[filename],
          !import.meta.env.DEV && (`src/${filename}` === mapleReplPlugin || `src/${filename}` === appWrapperFile),
        )
      }
    } else {
      setFile(files, appFile, welcomeCode)
    }

    if (!files[appWrapperFile]) {
      setFile(files, appWrapperFile, appWrapperCode, !import.meta.env.DEV)
    }

    if (!files[mapleReplPlugin]) {
      setFile(
        files,
        mapleReplPlugin,
        getMapleReplPluginCode(usePreviewVersion ? 'preview' : 'latest'),
        !import.meta.env.DEV,
      )
    }

    this.defaultVueRuntimeURL = defaultVueRuntimeURL
    this.defaultVueServerRendererURL = defaultVueServerRendererURL
    this.initialShowOutput = showOutput
    this.initialOutputMode = outputMode as OutputModes

    this.state = reactive({
      files,
      mainFile: appWrapperFile,
      activeFile: files[appFile],
      errors: [],
      vueRuntimeURL: this.defaultVueRuntimeURL,
      vueServerRendererURL: this.defaultVueServerRendererURL,
      resetFlip: true,
      typescriptVersion,
    })

    this.initImportMap()
    this.initTsConfig()
  }

  init() {
    watchEffect(() => compileFile(this, this.state.activeFile).then((errs) => (this.state.errors = errs)))

    this.state.errors = []

    for (const file in this.state.files) {
      if (file !== appFile) {
        compileFile(this, this.state.files[file]).then((errs) => this.state.errors.push(...errs))
      }
    }
  }

  private initTsConfig() {
    if (!this.state.files[tsconfigFile]) {
      this.setTsConfig(tsconfig)
    }
  }

  setTsConfig(config: any) {
    this.state.files[tsconfigFile] = new File(tsconfigFile, JSON.stringify(config, undefined, 2))
  }

  getTsConfig() {
    try {
      return JSON.parse(this.state.files[tsconfigFile].code)
    } catch {
      return {}
    }
  }

  setActive(filename: string) {
    this.state.activeFile = this.state.files[filename]
  }

  addFile(fileOrFilename: string | File): void {
    const file = typeof fileOrFilename === 'string' ? new File(fileOrFilename) : fileOrFilename
    this.state.files[file.filename] = file
    if (!file.hidden) {
      this.setActive(file.filename)
    }
  }

  deleteFile(filename: string) {
    if (filename === mapleReplPlugin || filename === appWrapperFile) {
      Message.warning('You cannot delete this file because Maple depends on it')
      return
    }

    Dialog.confirm(`Are you sure you want to delete ${stripSrcPrefix(filename)}?`).then((action) => {
      if (action === 'confirm') {
        if (this.state.activeFile.filename === filename) {
          this.state.activeFile = this.state.files[this.state.mainFile]
        }
        delete this.state.files[filename]
      }
    })
  }

  renameFile(oldFilename: string, newFilename: string) {
    const { files } = this.state
    const file = files[oldFilename]

    if (!file) {
      this.state.errors = [`Could not rename "${oldFilename}", file not found`]
      return
    }

    if (!newFilename || oldFilename === newFilename) {
      this.state.errors = [`Cannot rename "${oldFilename}" to "${newFilename}"`]
      return
    }

    file.filename = newFilename

    const newFiles: Record<string, File> = {}

    // Preserve iteration order for files

    for (const name in files) {
      if (name === oldFilename) {
        newFiles[newFilename] = file
      } else {
        newFiles[name] = files[name]
      }
    }

    this.state.files = newFiles

    if (this.state.mainFile === oldFilename) {
      this.state.mainFile = newFilename
    }

    compileFile(this, file).then((errs) => (this.state.errors = errs))
  }

  serialize() {
    const files = this.getFiles()
    const importMap = files[importMapFile]
    if (importMap) {
      const { imports } = JSON.parse(importMap)
      if (imports.vue === this.defaultVueRuntimeURL) {
        delete imports.vue
      }
      if (imports['vue/server-renderer'] === this.defaultVueServerRendererURL) {
        delete imports['vue/server-renderer']
      }
      if (!Object.keys(imports).length) {
        delete files[importMapFile]
      } else {
        files[importMapFile] = JSON.stringify({ imports }, null, 2)
      }
    }
    return '#' + utoa(JSON.stringify(files))
  }

  getFiles() {
    const exported: Record<string, string> = {}

    for (const filename in this.state.files) {
      const normalized = filename === importMapFile ? filename : filename.replace(/^src\//, '')
      exported[normalized] = this.state.files[filename].code
    }

    return exported
  }

  private forceSandboxReset() {
    this.state.resetFlip = !this.state.resetFlip
  }

  private initImportMap() {
    const map = this.state.files['import-map.json']
    if (!map) {
      this.state.files['import-map.json'] = new File(
        'import-map.json',
        JSON.stringify(
          {
            imports: {
              vue: this.defaultVueRuntimeURL,
              ...imports,
              'vue/server-renderer': this.defaultVueServerRendererURL,
            },
          },
          null,
          2,
        ),
      )
    } else {
      try {
        const json = JSON.parse(map.code)
        if (!json.imports.vue) {
          json.imports.vue = this.defaultVueRuntimeURL
        } else {
          json.imports.vue = fixURL(json.imports.vue)
        }
        if (!json.imports['vue/server-renderer']) {
          json.imports['vue/server-renderer'] = this.defaultVueServerRendererURL
        } else {
          json.imports['vue/server-renderer'] = fixURL(json.imports['vue/server-renderer'])
        }
        map.code = JSON.stringify(json, null, 2)
      } catch {}
    }
  }

  getImportMap() {
    try {
      return JSON.parse(this.state.files[importMapFile].code)
    } catch (e) {
      this.state.errors = [`Syntax error in import-map.json: ${(e as Error).message}`]
      return {}
    }
  }

  setImportMap(map: { imports: Record<string, string>; scopes?: Record<string, Record<string, string>> }) {
    this.state.files[importMapFile]!.code = JSON.stringify(map, null, 2)
  }

  setMapleVersion(version: string) {
    this.mapleVersion = version
    const importMap = this.getImportMap()
    const imports = importMap.imports || (importMap.imports = {})
    imports['@maple-design/ui-vue'] = getMaplePackageUrls(version).module
    setFile(this.state.files, mapleReplPlugin, getMapleReplPluginCode(version), !import.meta.env.DEV)
    compileFile(this, this.state.files[mapleReplPlugin]).then((errs) => this.state.errors.push(...errs))
    this.setImportMap(importMap)
    this.forceSandboxReset()

    console.info(`[maple] Now using Maple version: ${version}`)
  }

  async setVueVersion(version: string) {
    this.vueVersion = version
    const compilerUrl = `https://cdn.jsdelivr.net/npm/@vue/compiler-sfc@${version}/dist/compiler-sfc.esm-browser.js`
    const runtimeUrl = `https://cdn.jsdelivr.net/npm/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js`
    const ssrUrl = `https://cdn.jsdelivr.net/npm/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js`
    this.pendingCompiler = import(/* @vite-ignore */ compilerUrl)
    this.compiler = await this.pendingCompiler
    this.pendingCompiler = null
    this.state.vueRuntimeURL = runtimeUrl
    this.state.vueServerRendererURL = ssrUrl
    const importMap = this.getImportMap()
    const imports = importMap.imports || (importMap.imports = {})
    imports.vue = runtimeUrl
    imports['vue/server-renderer'] = ssrUrl
    this.setImportMap(importMap)
    this.forceSandboxReset()

    console.info(`[@vue/repl] Now using Vue version: ${version}`)
  }

  resetVueVersion() {
    this.vueVersion = undefined
    this.compiler = defaultCompiler
    this.state.vueRuntimeURL = this.defaultVueRuntimeURL
    this.state.vueServerRendererURL = this.defaultVueServerRendererURL
    const importMap = this.getImportMap()
    const imports = importMap.imports || (importMap.imports = {})
    imports.vue = this.defaultVueRuntimeURL
    imports['vue/server-renderer'] = this.defaultVueServerRendererURL
    this.setImportMap(importMap)
    this.forceSandboxReset()
    console.info(`[@vue/repl] Now using default Vue version`)
  }
}

function setFile(files: Record<string, File>, filename: string, content: string, hidden = false) {
  // prefix user files with src/
  // for cleaner Volar path completion when using Monaco editor
  const normalized =
    filename !== importMapFile && filename !== tsconfigFile && !filename.startsWith('src/')
      ? `src/${filename}`
      : filename
  files[normalized] = new File(normalized, content, hidden)
}

function fixURL(url: string) {
  return url.replace('https://sfc.vuejs', 'https://play.vuejs')
}

function stripSrcPrefix(file: string) {
  return file.replace(/^src\//, '')
}
