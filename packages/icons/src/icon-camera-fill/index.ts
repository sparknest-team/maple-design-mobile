import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCameraFill from './icon-camera-fill.vue'

export const IconCameraFill: IconComponent = Object.assign(_IconCameraFill, {
  install(app: App) { app.component(_IconCameraFill.name!, _IconCameraFill) },
})
