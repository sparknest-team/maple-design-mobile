import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCloseCircleFill from './icon-close-circle-fill.vue'

export const IconCloseCircleFill: IconComponent = Object.assign(_IconCloseCircleFill, {
  install(app: App) { app.component(_IconCloseCircleFill.name!, _IconCloseCircleFill) },
})
