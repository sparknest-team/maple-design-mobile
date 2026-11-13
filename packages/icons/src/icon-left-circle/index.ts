import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLeftCircle from './icon-left-circle.vue'

export const IconLeftCircle: IconComponent = Object.assign(_IconLeftCircle, {
  install(app: App) { app.component(_IconLeftCircle.name, _IconLeftCircle) },
})
