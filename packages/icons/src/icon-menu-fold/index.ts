import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenuFold from './icon-menu-fold.vue'

export const IconMenuFold: IconComponent = Object.assign(_IconMenuFold, {
  install(app: App) { app.component(_IconMenuFold.name!, _IconMenuFold) },
})
