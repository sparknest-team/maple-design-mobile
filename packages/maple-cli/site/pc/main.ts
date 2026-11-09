import { createApp, h } from 'vue'
import config from '@config'
import {
  currentStyleVars,
  currentThemePreset,
  getSavedLanguage,
  normalizeLanguage,
  saveLanguage,
} from '@maple-design/cli/client'
import { Locale, ThemeProvider } from '@maple-design/ui'
import routes from '@pc-routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import { getDesktopPath } from '../mobile/route-sync'
import { installRouteRecovery } from '../route-recovery'
import App from './App.vue'
import CodeExample from './components/code-example'
import DemoPreview from './components/demo-preview'
import '@maple-design/touch-emulator'
import '@maple-foundation'

const defaultLanguage = getSavedLanguage(normalizeLanguage(config?.defaultLanguage))
Locale.add('zh-CN', Locale.zhCN)
Locale.add('en-US', Locale.enUS)
const redirect = config?.pc?.redirect
const mobileRedirect = config?.mobile?.redirect

redirect &&
  routes.push({
    path: '/:pathMatch(.*)*',
    redirect: `/${defaultLanguage}${redirect}`,
  })

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to: any) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100,
      }
    }

    return { top: 0 }
  },
})

installRouteRecovery(router)

router.beforeEach((to: any, from: any) => {
  const language = normalizeLanguage(to.path.split('/')[1], defaultLanguage)
  Locale.use(language)
  saveLanguage(language)
  if (to.fullPath === from.fullPath) {
    return false
  }

  // @ts-ignore
  if (
    window._hmt &&
    (from.matched.length === 0 || to.path !== from.path || JSON.stringify(to.query) !== JSON.stringify(from.query))
  ) {
    if (to.path) {
      // @ts-ignore
      window._hmt.push(['_trackPageview', `/#${to.fullPath}`])
    }
  }
})

Object.defineProperty(window, 'onMobileRouteChange', {
  value: (path: string, language: string, replace: string, hash: string, query: Record<string, any> = {}) => {
    const { language: _language, platform: _platform, replace: _replace, ...businessQuery } = query
    router.replace({
      path: path === mobileRedirect ? `/${language}/${replace}` : getDesktopPath(path, language),
      hash,
      query: businessQuery,
    })
  },
})

Object.defineProperty(window, 'scrollToMenu', {
  value: (docName: string) => {
    setTimeout(() => {
      const cell = document.getElementById(docName) as HTMLElement
      const scroller = cell.parentNode as HTMLElement
      scroller.scrollTo({ top: cell.offsetTop - scroller.offsetHeight / 2 })
    })
  },
})

createApp({
  render: () =>
    h(
      ThemeProvider,
      {
        theme: currentThemePreset.value,
        styleVars: currentStyleVars.value,
        style: { minHeight: '100vh', background: 'var(--mp-color-body)', color: 'var(--mp-color-text)' },
      },
      () => h(App),
    ),
})
  .use(router)
  // @ts-ignore
  .use(CodeExample)
  .use(DemoPreview)
  .mount('#app')
