import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconHighlight from './icon-highlight.vue'

export const IconHighlight: IconComponent = Object.assign(_IconHighlight, {
  install(app: App) { app.component(_IconHighlight.name!, _IconHighlight) },
})
