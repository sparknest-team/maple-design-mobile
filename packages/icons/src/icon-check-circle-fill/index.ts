import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckCircleFill from './icon-check-circle-fill.vue'

export const IconCheckCircleFill: IconComponent = Object.assign(_IconCheckCircleFill, {
  install(app: App) { app.component(_IconCheckCircleFill.name!, _IconCheckCircleFill) },
})
