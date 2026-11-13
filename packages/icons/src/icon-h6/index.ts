import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconH6 from './icon-h6.vue'

export const IconH6: IconComponent = Object.assign(_IconH6, {
  install(app: App) { app.component(_IconH6.name, _IconH6) },
})
