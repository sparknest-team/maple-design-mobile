import type { App } from 'vue'
import _IconCheckboxMarkedFill from './icon-checkbox-marked-fill.vue'

export const IconCheckboxMarkedFill = Object.assign(_IconCheckboxMarkedFill, {
  install(app: App) { app.component(_IconCheckboxMarkedFill.name, _IconCheckboxMarkedFill) },
})
