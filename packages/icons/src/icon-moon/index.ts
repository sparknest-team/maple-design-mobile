import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMoon from './icon-moon.vue'

export const IconMoon: IconComponent = Object.assign(_IconMoon, {
  install(app: App) { app.component(_IconMoon.name, _IconMoon) },
})
