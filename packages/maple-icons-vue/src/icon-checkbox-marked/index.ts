import type { App } from 'vue'
import _IconCheckboxMarked from './icon-checkbox-marked.vue'

export const IconCheckboxMarked = Object.assign(_IconCheckboxMarked, {
  install(app: App) {
    app.component(_IconCheckboxMarked.name, _IconCheckboxMarked)
  },
})
