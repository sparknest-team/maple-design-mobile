import type { App } from 'vue'
import _IconSkipPreviousFill from './icon-skip-previous-fill.vue'

export const IconSkipPreviousFill = Object.assign(_IconSkipPreviousFill, {
  install(app: App) { app.component(_IconSkipPreviousFill.name, _IconSkipPreviousFill) },
})
