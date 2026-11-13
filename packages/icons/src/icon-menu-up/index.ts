import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenuUp from './icon-menu-up.vue'

export const IconMenuUp: IconComponent = Object.assign(_IconMenuUp, {
  install(app: App) { app.component(_IconMenuUp.name, _IconMenuUp) },
})
