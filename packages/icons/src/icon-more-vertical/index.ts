import type { App } from 'vue'
import _IconMoreVertical from './icon-more-vertical.vue'

export const IconMoreVertical = Object.assign(_IconMoreVertical, {
  install(app: App) { app.component(_IconMoreVertical.name, _IconMoreVertical) },
})
