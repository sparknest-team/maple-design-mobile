import type { App } from 'vue'
import _IconUserCircleFill from './icon-user-circle-fill.vue'

export const IconUserCircleFill = Object.assign(_IconUserCircleFill, {
  install(app: App) { app.component(_IconUserCircleFill.name, _IconUserCircleFill) },
})
