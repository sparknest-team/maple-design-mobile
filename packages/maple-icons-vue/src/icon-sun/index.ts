import type { App } from 'vue'
import _IconSun from './icon-sun.vue'

export const IconSun = Object.assign(_IconSun, {
  install(app: App) { app.component(_IconSun.name, _IconSun) },
})
