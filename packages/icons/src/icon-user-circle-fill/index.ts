import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUserCircleFill from './icon-user-circle-fill.vue'

export const IconUserCircleFill: IconComponent = Object.assign(_IconUserCircleFill, {
  install(app: App) { app.component(_IconUserCircleFill.name!, _IconUserCircleFill) },
})
