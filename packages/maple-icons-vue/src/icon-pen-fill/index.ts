import type { App } from 'vue'
import _IconPenFill from './icon-pen-fill.vue'

export const IconPenFill = Object.assign(_IconPenFill, {
  install(app: App) { app.component(_IconPenFill.name, _IconPenFill) },
})
