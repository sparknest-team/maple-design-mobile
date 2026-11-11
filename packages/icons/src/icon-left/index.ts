import type { App } from 'vue'
import _IconLeft from './icon-left.vue'

export const IconLeft = Object.assign(_IconLeft, {
  install(app: App) { app.component(_IconLeft.name, _IconLeft) },
})
