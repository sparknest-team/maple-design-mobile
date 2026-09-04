import type { App } from 'vue'
import _IconCheckboxMarkedCircleFill from './icon-checkbox-marked-circle-fill.vue'

export const IconCheckboxMarkedCircleFill = Object.assign(_IconCheckboxMarkedCircleFill, {
  install(app: App) {
    app.component(_IconCheckboxMarkedCircleFill.name, _IconCheckboxMarkedCircleFill)
  },
})
