import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconThumbDownFill from './icon-thumb-down-fill.vue'

export const IconThumbDownFill: IconComponent = Object.assign(_IconThumbDownFill, {
  install(app: App) { app.component(_IconThumbDownFill.name!, _IconThumbDownFill) },
})
