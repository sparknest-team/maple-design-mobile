import type { App } from 'vue'
import _IconFileVideo from './icon-file-video.vue'

export const IconFileVideo = Object.assign(_IconFileVideo, {
  install(app: App) {
    app.component(_IconFileVideo.name, _IconFileVideo)
  },
})
