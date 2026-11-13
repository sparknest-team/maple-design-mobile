import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckboxBlank from './icon-checkbox-blank.vue'

export const IconCheckboxBlank: IconComponent = Object.assign(_IconCheckboxBlank, {
  install(app: App) { app.component(_IconCheckboxBlank.name, _IconCheckboxBlank) },
})
