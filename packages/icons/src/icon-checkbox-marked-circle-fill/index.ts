import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckboxMarkedCircleFill from './icon-checkbox-marked-circle-fill.vue'

export const IconCheckboxMarkedCircleFill: IconComponent = Object.assign(_IconCheckboxMarkedCircleFill, {
  install(app: App) { app.component(_IconCheckboxMarkedCircleFill.name, _IconCheckboxMarkedCircleFill) },
})
