import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMoreVertical from './icon-more-vertical.vue'

export const IconMoreVertical: IconComponent = Object.assign(_IconMoreVertical, {
  install(app: App) { app.component(_IconMoreVertical.name!, _IconMoreVertical) },
})
