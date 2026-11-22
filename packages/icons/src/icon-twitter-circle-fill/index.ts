import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTwitterCircleFill from './icon-twitter-circle-fill.vue'

export const IconTwitterCircleFill: IconComponent = Object.assign(_IconTwitterCircleFill, {
  install(app: App) { app.component(_IconTwitterCircleFill.name!, _IconTwitterCircleFill) },
})
