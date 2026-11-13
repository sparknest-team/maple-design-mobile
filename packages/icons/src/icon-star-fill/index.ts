import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconStarFill from './icon-star-fill.vue'

export const IconStarFill: IconComponent = Object.assign(_IconStarFill, {
  install(app: App) { app.component(_IconStarFill.name, _IconStarFill) },
})
