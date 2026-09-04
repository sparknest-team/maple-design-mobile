import type { App } from 'vue'
import _IconVideoCamera from './icon-video-camera.vue'

export const IconVideoCamera = Object.assign(_IconVideoCamera, {
  install(app: App) {
    app.component(_IconVideoCamera.name, _IconVideoCamera)
  },
})
