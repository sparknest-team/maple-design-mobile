import type { App } from 'vue'
import _IconSwap from './icon-swap.vue'

export const IconSwap = Object.assign(_IconSwap, {
  install(app: App) {
    app.component(_IconSwap.name, _IconSwap)
  },
})
