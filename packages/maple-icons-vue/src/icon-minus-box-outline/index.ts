import type { App } from 'vue'
import _IconMinusBoxOutline from './icon-minus-box-outline.vue'

export const IconMinusBoxOutline = Object.assign(_IconMinusBoxOutline, {
  install(app: App) {
    app.component(_IconMinusBoxOutline.name, _IconMinusBoxOutline)
  },
})
