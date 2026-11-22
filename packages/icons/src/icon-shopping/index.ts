import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShopping from './icon-shopping.vue'

export const IconShopping: IconComponent = Object.assign(_IconShopping, {
  install(app: App) { app.component(_IconShopping.name!, _IconShopping) },
})
