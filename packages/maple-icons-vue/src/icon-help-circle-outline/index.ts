import type { App } from 'vue'
import _IconHelpCircleOutline from './icon-help-circle-outline.vue'

export const IconHelpCircleOutline = Object.assign(_IconHelpCircleOutline, {
  install(app: App) {
    app.component(_IconHelpCircleOutline.name, _IconHelpCircleOutline)
  },
})
