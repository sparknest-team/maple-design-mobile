import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconToTop from './icon-to-top.vue'

export const IconToTop: IconComponent = Object.assign(_IconToTop, {
  install(app: App) { app.component(_IconToTop.name!, _IconToTop) },
})
