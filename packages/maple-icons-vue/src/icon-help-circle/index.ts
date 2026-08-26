import type { App } from 'vue'
import _IconHelpCircle from './icon-help-circle.vue'

export const IconHelpCircle = Object.assign(_IconHelpCircle, {
  install(app: App) {
    app.component(_IconHelpCircle.name, _IconHelpCircle)
  },
})
