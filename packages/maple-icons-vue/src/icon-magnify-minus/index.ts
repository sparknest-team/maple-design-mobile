import type { App } from 'vue'
import _IconMagnifyMinus from './icon-magnify-minus.vue'

export const IconMagnifyMinus = Object.assign(_IconMagnifyMinus, {
  install(app: App) {
    app.component(_IconMagnifyMinus.name, _IconMagnifyMinus)
  },
})
