import type { App } from 'vue'
import _IconAlignLeft from './icon-align-left.vue'

export const IconAlignLeft = Object.assign(_IconAlignLeft, {
  install(app: App) { app.component(_IconAlignLeft.name, _IconAlignLeft) },
})
