import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPlusCircle from './icon-plus-circle.vue'

export const IconPlusCircle: IconComponent = Object.assign(_IconPlusCircle, {
  install(app: App) { app.component(_IconPlusCircle.name, _IconPlusCircle) },
})
