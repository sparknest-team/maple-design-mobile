import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLoop from './icon-loop.vue'

export const IconLoop: IconComponent = Object.assign(_IconLoop, {
  install(app: App) { app.component(_IconLoop.name, _IconLoop) },
})
