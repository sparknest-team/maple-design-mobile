import type { App } from 'vue'
import _IconMinusCircle from './icon-minus-circle.vue'

export const IconMinusCircle = Object.assign(_IconMinusCircle, {
  install(app: App) { app.component(_IconMinusCircle.name, _IconMinusCircle) },
})
