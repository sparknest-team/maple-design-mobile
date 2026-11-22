import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSound from './icon-sound.vue'

export const IconSound: IconComponent = Object.assign(_IconSound, {
  install(app: App) { app.component(_IconSound.name!, _IconSound) },
})
