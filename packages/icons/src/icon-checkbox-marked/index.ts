import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckboxMarked from './icon-checkbox-marked.vue'

export const IconCheckboxMarked: IconComponent = Object.assign(_IconCheckboxMarked, {
  install(app: App) { app.component(_IconCheckboxMarked.name!, _IconCheckboxMarked) },
})
