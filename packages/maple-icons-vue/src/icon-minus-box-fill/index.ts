import type { App } from 'vue'
import _IconMinusBoxFill from './icon-minus-box-fill.vue'

export const IconMinusBoxFill = Object.assign(_IconMinusBoxFill, {
  install(app: App) {
    app.component(_IconMinusBoxFill.name, _IconMinusBoxFill)
  },
})
