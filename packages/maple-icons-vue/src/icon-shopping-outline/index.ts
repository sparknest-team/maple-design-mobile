import type { App } from 'vue'
import _IconShoppingOutline from './icon-shopping-outline.vue'

export const IconShoppingOutline = Object.assign(_IconShoppingOutline, {
  install(app: App) {
    app.component(_IconShoppingOutline.name, _IconShoppingOutline)
  },
})
