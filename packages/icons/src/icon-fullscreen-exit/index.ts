import type { App } from 'vue'
import _IconFullscreenExit from './icon-fullscreen-exit.vue'

export const IconFullscreenExit = Object.assign(_IconFullscreenExit, {
  install(app: App) { app.component(_IconFullscreenExit.name, _IconFullscreenExit) },
})
