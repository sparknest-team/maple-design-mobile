import type { App } from 'vue'
import _IconHighlight from './icon-highlight.vue'

export const IconHighlight = Object.assign(_IconHighlight, {
  install(app: App) {
    app.component(_IconHighlight.name, _IconHighlight)
  },
})
