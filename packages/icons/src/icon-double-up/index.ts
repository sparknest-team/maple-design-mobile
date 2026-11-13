import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDoubleUp from './icon-double-up.vue'

export const IconDoubleUp: IconComponent = Object.assign(_IconDoubleUp, {
  install(app: App) { app.component(_IconDoubleUp.name, _IconDoubleUp) },
})
