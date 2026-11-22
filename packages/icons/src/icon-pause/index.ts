import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPause from './icon-pause.vue'

export const IconPause: IconComponent = Object.assign(_IconPause, {
  install(app: App) { app.component(_IconPause.name!, _IconPause) },
})
