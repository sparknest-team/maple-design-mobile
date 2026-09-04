import type { App } from 'vue'
import _IconSound from './icon-sound.vue'

export const IconSound = Object.assign(_IconSound, {
  install(app: App) {
    app.component(_IconSound.name, _IconSound)
  },
})
