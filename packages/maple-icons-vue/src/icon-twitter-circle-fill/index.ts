import type { App } from 'vue'
import _IconTwitterCircleFill from './icon-twitter-circle-fill.vue'

export const IconTwitterCircleFill = Object.assign(_IconTwitterCircleFill, {
  install(app: App) { app.component(_IconTwitterCircleFill.name, _IconTwitterCircleFill) },
})
