import { createApp, defineAsyncComponent, h } from 'vue'
import config from '@config'
import {
  currentStyleVars,
  currentThemePreset,
  getSavedLanguage,
  normalizeLanguage,
  saveLanguage,
} from '@maple-design/cli-vue/client'
import { Locale, ThemeProvider } from '@maple-design/ui-vue'
import routes from '@mobile-routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import { installRouteRecovery } from '../route-recovery'
import { inIframe, isPhone } from '../utils'
import App from './App.vue'
import { getDesktopPath, shouldSyncMobileRoute } from './route-sync'
import '@maple-design/touch-emulator-vue'
import '@maple-foundation'

const redirect = config?.mobile?.redirect
const defaultLanguage = getSavedLanguage(normalizeLanguage(config?.defaultLanguage))
Locale.add('zh-CN', Locale.zhCN)
Locale.add('en-US', Locale.enUS)

redirect &&
  routes.push({
    path: '/:pathMatch(.*)',
    redirect,
  })

routes.push({
  path: '/home',
  component: () => import('./AppHome.vue'),
})

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (to: any, from: any, savedPosition: any) => savedPosition || { left: 0, top: 0 },
  routes,
})

installRouteRecovery(router)

router.beforeEach((to: any) => {
  const { path, hash, query } = to
  const language = normalizeLanguage(query.language ?? /^\/(zh-CN|en-US)\//.exec(path)?.[1], defaultLanguage)
  if (query.language !== language) {
    return { path, hash, query: { ...query, language }, replace: true }
  }
  Locale.use(language)
  saveLanguage(language)

  if (!isPhone() && !inIframe()) {
    window.location.href = `./#${getDesktopPath(path, language)}`
  }

  // @ts-expect-error Analytics is injected at runtime.
  if (window._hmt) {
    if (to.path) {
      // @ts-expect-error Analytics is injected at runtime.
      window._hmt.push(['_trackPageview', `/#${to.fullPath}`])
    }
  }
})

router.afterEach((to, from, failure) => {
  // Loading or replacing the iframe is driven by the PC route. Only a later
  // navigation inside the mobile preview should update the parent route.
  if (!shouldSyncMobileRoute(from, failure) || isPhone() || !inIframe()) {
    return
  }

  try {
    const language = normalizeLanguage(to.query.language, defaultLanguage)
    // @ts-expect-error The PC site registers this iframe callback at runtime.
    window.parent.onMobileRouteChange(to.path, language, to.query.replace, to.hash, to.query)
  } catch (error) {
    console.error(error)
  }
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
  .component(
    'MpSiteDemoPreview',
    defineAsyncComponent(() => import('../pc/components/demo-preview/DemoPreview.vue')),
  )
  .mount('#app')
