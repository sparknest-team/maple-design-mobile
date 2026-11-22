import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconThumbUp from './icon-thumb-up.vue'

export const IconThumbUp: IconComponent = Object.assign(_IconThumbUp, {
  install(app: App) { app.component(_IconThumbUp.name!, _IconThumbUp) },
})
