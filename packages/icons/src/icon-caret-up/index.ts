import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCaretUp from './icon-caret-up.vue'

export const IconCaretUp: IconComponent = Object.assign(_IconCaretUp, {
  install(app: App) { app.component(_IconCaretUp.name!, _IconCaretUp) },
})
