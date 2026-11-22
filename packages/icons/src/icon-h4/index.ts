import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconH4 from './icon-h4.vue'

export const IconH4: IconComponent = Object.assign(_IconH4, {
  install(app: App) { app.component(_IconH4.name!, _IconH4) },
})
