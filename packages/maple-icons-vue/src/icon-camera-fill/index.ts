import type { App } from 'vue'
import _IconCameraFill from './icon-camera-fill.vue'

export const IconCameraFill = Object.assign(_IconCameraFill, {
  install(app: App) { app.component(_IconCameraFill.name, _IconCameraFill) },
})
