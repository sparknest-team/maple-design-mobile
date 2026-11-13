import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconNav from './icon-nav.vue'

export const IconNav: IconComponent = Object.assign(_IconNav, {
  install(app: App) { app.component(_IconNav.name, _IconNav) },
})
