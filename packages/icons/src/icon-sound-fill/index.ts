import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSoundFill from './icon-sound-fill.vue'

export const IconSoundFill: IconComponent = Object.assign(_IconSoundFill, {
  install(app: App) { app.component(_IconSoundFill.name!, _IconSoundFill) },
})
