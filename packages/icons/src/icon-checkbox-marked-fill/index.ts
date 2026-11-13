import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckboxMarkedFill from './icon-checkbox-marked-fill.vue'

export const IconCheckboxMarkedFill: IconComponent = Object.assign(_IconCheckboxMarkedFill, {
  install(app: App) { app.component(_IconCheckboxMarkedFill.name, _IconCheckboxMarkedFill) },
})
