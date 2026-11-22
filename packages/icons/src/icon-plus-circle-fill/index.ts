import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPlusCircleFill from './icon-plus-circle-fill.vue'

export const IconPlusCircleFill: IconComponent = Object.assign(_IconPlusCircleFill, {
  install(app: App) { app.component(_IconPlusCircleFill.name!, _IconPlusCircleFill) },
})
