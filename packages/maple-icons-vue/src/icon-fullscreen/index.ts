import type { App } from 'vue'
import _IconFullscreen from './icon-fullscreen.vue'

export const IconFullscreen = Object.assign(_IconFullscreen, {
  install(app: App) {
    app.component(_IconFullscreen.name, _IconFullscreen)
  },
})
