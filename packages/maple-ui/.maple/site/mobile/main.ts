import { createApp } from 'vue'
import config from '@config'
import Maple from '@maplejs/maple-ui'
import routes from '@mobile-routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import { inIframe, isPhone } from '../utils'
import App from './App.vue'
import '@maplejs/maple-touch-emulator'
import '@maplejs/maple-ui/es/style'

const redirect = config?.mobile?.redirect
const defaultLanguage = config?.defaultLanguage

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
  const language = query.language ?? defaultLanguage
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

createApp(App).use(router).use(Maple).mount('#app')
