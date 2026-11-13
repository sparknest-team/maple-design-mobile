import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckboxMarkedCircle from './icon-checkbox-marked-circle.vue'

export const IconCheckboxMarkedCircle: IconComponent = Object.assign(_IconCheckboxMarkedCircle, {
  install(app: App) { app.component(_IconCheckboxMarkedCircle.name, _IconCheckboxMarkedCircle) },
})
