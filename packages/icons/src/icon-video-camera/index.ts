import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconVideoCamera from './icon-video-camera.vue'

export const IconVideoCamera: IconComponent = Object.assign(_IconVideoCamera, {
  install(app: App) { app.component(_IconVideoCamera.name, _IconVideoCamera) },
})
