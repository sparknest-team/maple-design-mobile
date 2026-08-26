import type { App } from 'vue'
import _IconCheckboxMarkedOutline from './icon-checkbox-marked-outline.vue'

export const IconCheckboxMarkedOutline = Object.assign(_IconCheckboxMarkedOutline, {
  install(app: App) {
    app.component(_IconCheckboxMarkedOutline.name, _IconCheckboxMarkedOutline)
  },
})
