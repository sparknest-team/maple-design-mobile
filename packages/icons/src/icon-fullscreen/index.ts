import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFullscreen from './icon-fullscreen.vue'

export const IconFullscreen: IconComponent = Object.assign(_IconFullscreen, {
  install(app: App) { app.component(_IconFullscreen.name, _IconFullscreen) },
})
