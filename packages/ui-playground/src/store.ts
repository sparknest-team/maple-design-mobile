import { ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui-vue'
import { compileFile, File, useStore, useVueImportMap } from '@vue/repl'
import { usePreviewVersion } from './utils/env'
import { getMaplePackageUrls } from './utils/package-urls'

const imports = {
  '@maple-design/ui-vue': getMaplePackageUrls(usePreviewVersion ? 'preview' : 'latest').module,
  '@maple-design/ui-vue/json/area.json': './maple-area.js',
  zod: 'https://esm.sh/zod@4.6.7',
  shiki: 'https://esm.sh/shiki@4.6.0',
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

export function createMapleStore(serializedState: string) {
  const { importMap, vueVersion } = useVueImportMap()
  const store = useStore({
    builtinImportMap: importMap,
    vueVersion,
    mainFile: ref(appWrapperFile),
    template: ref({ welcomeSFC: appWrapperCode }),
    // Monaco loads the browser JavaScript API, while downloaded projects run native tsc.
    typescriptVersion: ref('6.0.3'),
  })
  if (serializedState) {
    store.deserialize(serializedState)
  }
  const files = store.files
  files[appFile] ??= new File(appFile, welcomeCode)
  files[appWrapperFile] ??= new File(appWrapperFile, appWrapperCode)
  const initialVersion = usePreviewVersion ? 'preview' : 'latest'
  files[mapleReplPlugin] ??= new File(mapleReplPlugin, getMapleReplPluginCode(initialVersion))
  files[appWrapperFile].hidden = files[mapleReplPlugin].hidden = !import.meta.env.DEV
  files[tsconfigFile] ??= new File(tsconfigFile, JSON.stringify(tsconfig, null, 2))
  store.mainFile = appWrapperFile
  store.setActive(appFile)
  const savedMap = store.getImportMap()
  store.setImportMap({ ...savedMap, imports: { ...imports, ...savedMap.imports } })

  store.deleteFile = (filename) => {
    if (filename === mapleReplPlugin || filename === appWrapperFile) {
      Message.warning('You cannot delete this file because Maple depends on it')
      return
    }
    Dialog.confirm(`Are you sure you want to delete ${stripSrcPrefix(filename)}?`).then((action) => {
      if (action !== 'confirm') {
        return
      }
      if (store.activeFilename === filename) {
        store.setActive(store.mainFile)
      }
      delete store.files[filename]
    })
  }

  return Object.assign(store, {
    mapleVersion: initialVersion as string,
    setVueVersion(version: string) {
      store.vueVersion = version || null
    },
    async setMapleVersion(version: string) {
      this.mapleVersion = version
      const file = store.files[mapleReplPlugin]
      file.code = getMapleReplPluginCode(version)
      store.errors.push(...(await compileFile(store, file)))
      store.setImportMap({ imports: { '@maple-design/ui-vue': getMaplePackageUrls(version).module } }, true)
    },
  })
}

function stripSrcPrefix(file: string) {
  return file.replace(/^src\//, '')
}
