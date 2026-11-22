import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDoubleLeft from './icon-double-left.vue'

export const IconDoubleLeft: IconComponent = Object.assign(_IconDoubleLeft, {
  install(app: App) { app.component(_IconDoubleLeft.name!, _IconDoubleLeft) },
})
