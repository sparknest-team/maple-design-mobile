import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFullscreenExit from './icon-fullscreen-exit.vue'

export const IconFullscreenExit: IconComponent = Object.assign(_IconFullscreenExit, {
  install(app: App) { app.component(_IconFullscreenExit.name!, _IconFullscreenExit) },
})
