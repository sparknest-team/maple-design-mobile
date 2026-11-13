import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFileAudio from './icon-file-audio.vue'

export const IconFileAudio: IconComponent = Object.assign(_IconFileAudio, {
  install(app: App) { app.component(_IconFileAudio.name, _IconFileAudio) },
})
