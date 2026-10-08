import type { App } from 'vue'
import _IconFormatListCheckbox from './icon-format-list-checkbox.vue'

export const IconFormatListCheckbox = Object.assign(_IconFormatListCheckbox, {
  install(app: App) { app.component(_IconFormatListCheckbox.name, _IconFormatListCheckbox) },
})
