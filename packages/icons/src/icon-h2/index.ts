import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconH2 from './icon-h2.vue'

export const IconH2: IconComponent = Object.assign(_IconH2, {
  install(app: App) { app.component(_IconH2.name!, _IconH2) },
})
