import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCamera from './icon-camera.vue'

export const IconCamera: IconComponent = Object.assign(_IconCamera, {
  install(app: App) { app.component(_IconCamera.name, _IconCamera) },
})
