import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconH3 from './icon-h3.vue'

export const IconH3: IconComponent = Object.assign(_IconH3, {
  install(app: App) { app.component(_IconH3.name!, _IconH3) },
})
