import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShoppingFill from './icon-shopping-fill.vue'

export const IconShoppingFill: IconComponent = Object.assign(_IconShoppingFill, {
  install(app: App) { app.component(_IconShoppingFill.name, _IconShoppingFill) },
})
