import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBell from './icon-bell.vue'

export const IconBell: IconComponent = Object.assign(_IconBell, {
  install(app: App) { app.component(_IconBell.name, _IconBell) },
})
