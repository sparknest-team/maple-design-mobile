import type { App } from 'vue'
import _IconCheckboxBlankOutline from './icon-checkbox-blank-outline.vue'

export const IconCheckboxBlankOutline = Object.assign(_IconCheckboxBlankOutline, {
  install(app: App) {
    app.component(_IconCheckboxBlankOutline.name, _IconCheckboxBlankOutline)
  },
})
