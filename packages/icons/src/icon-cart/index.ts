import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCart from './icon-cart.vue'

export const IconCart: IconComponent = Object.assign(_IconCart, {
  install(app: App) { app.component(_IconCart.name!, _IconCart) },
})
