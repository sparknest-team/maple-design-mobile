import type { App } from 'vue'
import _IconCheckboxMarkedCircle from './icon-checkbox-marked-circle.vue'

export const IconCheckboxMarkedCircle = Object.assign(_IconCheckboxMarkedCircle, {
  install(app: App) {
    app.component(_IconCheckboxMarkedCircle.name, _IconCheckboxMarkedCircle)
  },
})
