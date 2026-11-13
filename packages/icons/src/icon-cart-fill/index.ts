import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCartFill from './icon-cart-fill.vue'

export const IconCartFill: IconComponent = Object.assign(_IconCartFill, {
  install(app: App) { app.component(_IconCartFill.name, _IconCartFill) },
})
