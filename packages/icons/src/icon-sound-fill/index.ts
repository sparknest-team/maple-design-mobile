import type { App } from 'vue'
import _IconSoundFill from './icon-sound-fill.vue'

export const IconSoundFill = Object.assign(_IconSoundFill, {
  install(app: App) { app.component(_IconSoundFill.name, _IconSoundFill) },
})
