import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBrush from './icon-brush.vue'

export const IconBrush: IconComponent = Object.assign(_IconBrush, {
  install(app: App) { app.component(_IconBrush.name, _IconBrush) },
})
