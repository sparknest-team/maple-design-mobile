import type { App } from 'vue'
import _IconCameraOutline from './icon-camera-outline.vue'

export const IconCameraOutline = Object.assign(_IconCameraOutline, {
  install(app: App) {
    app.component(_IconCameraOutline.name, _IconCameraOutline)
  },
})
