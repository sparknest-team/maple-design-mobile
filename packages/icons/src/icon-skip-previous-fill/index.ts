import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSkipPreviousFill from './icon-skip-previous-fill.vue'

export const IconSkipPreviousFill: IconComponent = Object.assign(_IconSkipPreviousFill, {
  install(app: App) { app.component(_IconSkipPreviousFill.name, _IconSkipPreviousFill) },
})
