import { createApp } from 'vue'
import config from '@config'
import { getSavedLanguage, normalizeLanguage, saveLanguage } from '@maplejs/maple-cli/client'
import { Locale } from '@maplejs/maple-ui'
import routes from '@mobile-routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import { inIframe, isPhone } from '../utils'
import App from './App.vue'
import { shouldSyncMobileRoute } from './route-sync'
import '@maplejs/maple-touch-emulator'
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

router.beforeEach((to: any) => {
  const { path, hash, query } = to
  const language = normalizeLanguage(query.language, defaultLanguage)
  if (query.language !== language) {
    return { path, hash, query: { ...query, language }, replace: true }
  }
  Locale.use(language)
  saveLanguage(language)

  if (!isPhone() && !inIframe()) {
    window.location.href = `./#/${language}${path}`
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
    window.parent.onMobileRouteChange(to.path, language, to.query.replace, to.hash)
  } catch (error) {
    console.error(error)
  }
})

createApp(App).use(router).mount('#app')
