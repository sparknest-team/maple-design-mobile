import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconVoice from './icon-voice.vue'

export const IconVoice: IconComponent = Object.assign(_IconVoice, {
  install(app: App) { app.component(_IconVoice.name, _IconVoice) },
})
