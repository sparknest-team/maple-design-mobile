import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMinusCircle from './icon-minus-circle.vue'

export const IconMinusCircle: IconComponent = Object.assign(_IconMinusCircle, {
  install(app: App) { app.component(_IconMinusCircle.name, _IconMinusCircle) },
})
