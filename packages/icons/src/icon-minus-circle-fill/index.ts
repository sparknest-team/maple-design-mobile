import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMinusCircleFill from './icon-minus-circle-fill.vue'

export const IconMinusCircleFill: IconComponent = Object.assign(_IconMinusCircleFill, {
  install(app: App) { app.component(_IconMinusCircleFill.name, _IconMinusCircleFill) },
})
