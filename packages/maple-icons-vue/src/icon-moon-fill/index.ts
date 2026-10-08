import type { App } from 'vue'
import _IconMoonFill from './icon-moon-fill.vue'

export const IconMoonFill = Object.assign(_IconMoonFill, {
  install(app: App) { app.component(_IconMoonFill.name, _IconMoonFill) },
})
