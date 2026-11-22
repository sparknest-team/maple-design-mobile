import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenuRight from './icon-menu-right.vue'

export const IconMenuRight: IconComponent = Object.assign(_IconMenuRight, {
  install(app: App) { app.component(_IconMenuRight.name!, _IconMenuRight) },
})
