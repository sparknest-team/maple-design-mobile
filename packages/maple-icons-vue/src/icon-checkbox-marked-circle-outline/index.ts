import type { App } from 'vue'
import _IconCheckboxMarkedCircleOutline from './icon-checkbox-marked-circle-outline.vue'

export const IconCheckboxMarkedCircleOutline = Object.assign(_IconCheckboxMarkedCircleOutline, {
  install(app: App) {
    app.component(_IconCheckboxMarkedCircleOutline.name, _IconCheckboxMarkedCircleOutline)
  },
})
