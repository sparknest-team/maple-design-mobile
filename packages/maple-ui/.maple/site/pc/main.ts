import { createApp } from 'vue'
import config from '@config'
import Maple, { Snackbar } from '@maplejs/maple-ui'
import routes from '@pc-routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import CodeExample from './components/code-example'
import '@maplejs/maple-ui/es/style'
import '@maplejs/maple-touch-emulator'

const defaultLanguage = config?.defaultLanguage
const redirect = config?.pc?.redirect
const mobileRedirect = config?.mobile?.redirect

Snackbar.allowMultiple(true)

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

router.beforeEach((to: any, from: any) => {
  if (to.fullPath === from.fullPath) {
    return false
  }

  // @ts-ignore
  if (window._hmt) {
    if (to.path) {
      // @ts-ignore
      window._hmt.push(['_trackPageview', `/#${to.fullPath}`])
    }
  }
})

Object.defineProperty(window, 'onMobileRouteChange', {
  value: (path: string, language: string, replace: string, hash: string) => {
    if (path === mobileRedirect) {
      router.replace(`/${language}/${replace}${hash}`)
      return
    }

    router.replace(`/${language}${path}${hash}`)
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

createApp(App)
  .use(Maple)
  .use(router)
  // @ts-ignore
  .use(CodeExample)
  .mount('#app')
