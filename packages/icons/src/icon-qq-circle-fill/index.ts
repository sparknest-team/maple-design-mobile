import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQqCircleFill from './icon-qq-circle-fill.vue'

export const IconQqCircleFill: IconComponent = Object.assign(_IconQqCircleFill, {
  install(app: App) { app.component(_IconQqCircleFill.name!, _IconQqCircleFill) },
})
