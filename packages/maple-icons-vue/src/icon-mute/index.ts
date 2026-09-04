import type { App } from 'vue'
import _IconMute from './icon-mute.vue'

export const IconMute = Object.assign(_IconMute, {
  install(app: App) {
    app.component(_IconMute.name, _IconMute)
  },
})
