import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconThumbDown from './icon-thumb-down.vue'

export const IconThumbDown: IconComponent = Object.assign(_IconThumbDown, {
  install(app: App) { app.component(_IconThumbDown.name!, _IconThumbDown) },
})
