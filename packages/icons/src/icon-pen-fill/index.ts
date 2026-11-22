import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPenFill from './icon-pen-fill.vue'

export const IconPenFill: IconComponent = Object.assign(_IconPenFill, {
  install(app: App) { app.component(_IconPenFill.name!, _IconPenFill) },
})
