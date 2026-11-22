import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBellFill from './icon-bell-fill.vue'

export const IconBellFill: IconComponent = Object.assign(_IconBellFill, {
  install(app: App) { app.component(_IconBellFill.name!, _IconBellFill) },
})
