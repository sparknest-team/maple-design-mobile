import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFileVideo from './icon-file-video.vue'

export const IconFileVideo: IconComponent = Object.assign(_IconFileVideo, {
  install(app: App) { app.component(_IconFileVideo.name, _IconFileVideo) },
})
