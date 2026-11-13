import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLockFill from './icon-lock-fill.vue'

export const IconLockFill: IconComponent = Object.assign(_IconLockFill, {
  install(app: App) { app.component(_IconLockFill.name, _IconLockFill) },
})
