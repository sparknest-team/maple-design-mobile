import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconHomeFill from './icon-home-fill.vue'

export const IconHomeFill: IconComponent = Object.assign(_IconHomeFill, {
  install(app: App) { app.component(_IconHomeFill.name!, _IconHomeFill) },
})
