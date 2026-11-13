import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDoubleDown from './icon-double-down.vue'

export const IconDoubleDown: IconComponent = Object.assign(_IconDoubleDown, {
  install(app: App) { app.component(_IconDoubleDown.name, _IconDoubleDown) },
})
