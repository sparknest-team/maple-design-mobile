import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMoonFill from './icon-moon-fill.vue'

export const IconMoonFill: IconComponent = Object.assign(_IconMoonFill, {
  install(app: App) { app.component(_IconMoonFill.name!, _IconMoonFill) },
})
