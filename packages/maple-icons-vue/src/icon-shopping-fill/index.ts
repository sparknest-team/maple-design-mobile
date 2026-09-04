import type { App } from 'vue'
import _IconShoppingFill from './icon-shopping-fill.vue'

export const IconShoppingFill = Object.assign(_IconShoppingFill, {
  install(app: App) {
    app.component(_IconShoppingFill.name, _IconShoppingFill)
  },
})
