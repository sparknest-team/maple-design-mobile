import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenuLeft from './icon-menu-left.vue'

export const IconMenuLeft: IconComponent = Object.assign(_IconMenuLeft, {
  install(app: App) { app.component(_IconMenuLeft.name!, _IconMenuLeft) },
})
