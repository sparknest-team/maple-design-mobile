import type { App } from 'vue'
import _IconNav from './icon-nav.vue'

export const IconNav = Object.assign(_IconNav, {
  install(app: App) { app.component(_IconNav.name, _IconNav) },
})
