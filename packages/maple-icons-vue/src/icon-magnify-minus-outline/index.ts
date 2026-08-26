import type { App } from 'vue'
import _IconMagnifyMinusOutline from './icon-magnify-minus-outline.vue'

export const IconMagnifyMinusOutline = Object.assign(_IconMagnifyMinusOutline, {
  install(app: App) {
    app.component(_IconMagnifyMinusOutline.name, _IconMagnifyMinusOutline)
  },
})
