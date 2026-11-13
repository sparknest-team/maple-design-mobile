import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSun from './icon-sun.vue'

export const IconSun: IconComponent = Object.assign(_IconSun, {
  install(app: App) { app.component(_IconSun.name, _IconSun) },
})
