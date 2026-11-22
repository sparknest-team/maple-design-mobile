import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFire from './icon-fire.vue'

export const IconFire: IconComponent = Object.assign(_IconFire, {
  install(app: App) { app.component(_IconFire.name!, _IconFire) },
})
