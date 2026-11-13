import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPen from './icon-pen.vue'

export const IconPen: IconComponent = Object.assign(_IconPen, {
  install(app: App) { app.component(_IconPen.name, _IconPen) },
})
