import type { App } from 'vue'
import _IconFileAudio from './icon-file-audio.vue'

export const IconFileAudio = Object.assign(_IconFileAudio, {
  install(app: App) { app.component(_IconFileAudio.name, _IconFileAudio) },
})
