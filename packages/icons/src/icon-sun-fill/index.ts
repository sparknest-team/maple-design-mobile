import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSunFill from './icon-sun-fill.vue'

export const IconSunFill: IconComponent = Object.assign(_IconSunFill, {
  install(app: App) { app.component(_IconSunFill.name!, _IconSunFill) },
})
