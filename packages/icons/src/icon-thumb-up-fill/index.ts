import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconThumbUpFill from './icon-thumb-up-fill.vue'

export const IconThumbUpFill: IconComponent = Object.assign(_IconThumbUpFill, {
  install(app: App) { app.component(_IconThumbUpFill.name!, _IconThumbUpFill) },
})
