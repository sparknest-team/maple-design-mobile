import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSwap from './icon-swap.vue'

export const IconSwap: IconComponent = Object.assign(_IconSwap, {
  install(app: App) { app.component(_IconSwap.name!, _IconSwap) },
})
