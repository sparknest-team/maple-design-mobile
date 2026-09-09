import { createApp } from 'vue'
import config from '@config'
import { getSavedLanguage, normalizeLanguage, saveLanguage } from '@maplejs/maple-cli/client'
import { Locale } from '@maplejs/maple-ui'
import routes from '@mobile-routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import { inIframe, isPhone } from '../utils'
import App from './App.vue'
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
  if (query.language !== language) return { path, hash, query: { ...query, language }, replace: true }
  Locale.use(language)
  saveLanguage(language)
  const replace = query.replace

  if (!isPhone() && !inIframe()) {
    window.location.href = `./#/${language}${path}`
  }

  if (!isPhone() && inIframe()) {
    try {
      // @ts-ignore
      window.parent.onMobileRouteChange(path, language, replace, hash)
    } catch (e) {
      console.log(e)
    }
  }

  // @ts-ignore
  if (window._hmt) {
    if (to.path) {
      // @ts-ignore
      window._hmt.push(['_trackPageview', `/#${to.fullPath}`])
    }
  }
})

createApp(App).use(router).mount('#app')
