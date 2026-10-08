import type { App } from 'vue'
import _IconBellFill from './icon-bell-fill.vue'

export const IconBellFill = Object.assign(_IconBellFill, {
  install(app: App) { app.component(_IconBellFill.name, _IconBellFill) },
})
