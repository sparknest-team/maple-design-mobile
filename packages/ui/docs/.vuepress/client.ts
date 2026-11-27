import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineClientConfig } from 'vuepress/client'
import { installScrollHash } from '@sparknest/vuepress-plugins-vue/scroll-hash'
import './docs.css'
import Locale from '../../src/locale'
import Landing from './Landing.vue'
import { legacyRoute } from './legacy-route'
import MapleLayout from './MapleLayout.vue'
import MapleThemeMenu from './MapleThemeMenu.vue'
import MobilePreview from './MobilePreview.vue'
import '@maple-foundation'

export default defineClientConfig({
  layouts: { Layout: MapleLayout, Landing },
  enhance({ app, router }) {
    app.component('MapleThemeMenu', MapleThemeMenu)
    if (typeof window === 'undefined') {
      return
    }
    Locale.add('zh-CN', Locale.zhCN)
    Locale.add('en-US', Locale.enUS)
    router.afterEach((to, from, failure) => {
      if (!failure && from.matched.length && window.frameElement?.id === 'mobile') {
        window.parent.postMessage({ mapleDocsPath: to.fullPath }, location.origin)
      }
      const english = to.path.startsWith('/en-US/') || to.query.language === 'en-US'
      Locale.use(english ? 'en-US' : 'zh-CN')
    })
    if (location.pathname.endsWith('-iframe.html')) {
      return
    }
    if (window.frameElement?.id === 'mobile' && !('ontouchstart' in window)) {
      void import('@maple-design/touch-emulator-vue')
    }
    router.beforeEach((to) => {
      const path = legacyRoute(to.hash)
      if (path) {
        return { ...router.resolve(path), replace: true }
      }
      if (typeof to.meta.redirectTo === 'string') {
        return { path: to.meta.redirectTo.replace(/\/?$/, '/'), query: to.query, hash: to.hash }
      }
    })
  },
  setup() {
    const router = useRouter()
    let stop: (() => void) | undefined
    function navigate(event: MessageEvent) {
      if (event.source !== window.parent || event.origin !== location.origin) {return}
      const path = event.data?.mapleDocsNavigate
      if (typeof path === 'string' && path.startsWith('/') && !path.startsWith('//') && path !== router.currentRoute.value.fullPath) {
        void router.replace(path)
      }
    }
    onMounted(() => {
      if (window.frameElement?.id === 'mobile') {
        window.addEventListener('message', navigate)
        window.parent.postMessage({ mapleDocsReady: true }, location.origin)
      }
      stop = installScrollHash(router, '[vp-content] #markdown-content')
    })
    onBeforeUnmount(() => {
      stop?.()
      window.removeEventListener('message', navigate)
    })
  },
  rootComponents: [MobilePreview],
})
