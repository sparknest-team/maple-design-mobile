import type { App } from 'vue'
import _IconMinus from './icon-minus.vue'

export const IconMinus = Object.assign(_IconMinus, {
  install(app: App) { app.component(_IconMinus.name, _IconMinus) },
})
