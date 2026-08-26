import type { App } from 'vue'
import _IconCartOutline from './icon-cart-outline.vue'

export const IconCartOutline = Object.assign(_IconCartOutline, {
  install(app: App) {
    app.component(_IconCartOutline.name, _IconCartOutline)
  },
})
