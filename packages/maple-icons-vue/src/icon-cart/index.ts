import type { App } from 'vue'
import _IconCart from './icon-cart.vue'

export const IconCart = Object.assign(_IconCart, {
  install(app: App) {
    app.component(_IconCart.name, _IconCart)
  },
})
