import type { App } from 'vue'
import _IconCartFill from './icon-cart-fill.vue'

export const IconCartFill = Object.assign(_IconCartFill, {
  install(app: App) { app.component(_IconCartFill.name, _IconCartFill) },
})
