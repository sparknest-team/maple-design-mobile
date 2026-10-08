import type { App } from 'vue'
import _IconCheckboxBlank from './icon-checkbox-blank.vue'

export const IconCheckboxBlank = Object.assign(_IconCheckboxBlank, {
  install(app: App) { app.component(_IconCheckboxBlank.name, _IconCheckboxBlank) },
})
