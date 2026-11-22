import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenuDown from './icon-menu-down.vue'

export const IconMenuDown: IconComponent = Object.assign(_IconMenuDown, {
  install(app: App) { app.component(_IconMenuDown.name!, _IconMenuDown) },
})
