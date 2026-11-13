import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMinusBoxFill from './icon-minus-box-fill.vue'

export const IconMinusBoxFill: IconComponent = Object.assign(_IconMinusBoxFill, {
  install(app: App) { app.component(_IconMinusBoxFill.name, _IconMinusBoxFill) },
})
