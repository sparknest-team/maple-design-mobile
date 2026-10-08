import type { App } from 'vue'
import _IconAlignCenter from './icon-align-center.vue'

export const IconAlignCenter = Object.assign(_IconAlignCenter, {
  install(app: App) { app.component(_IconAlignCenter.name, _IconAlignCenter) },
})
