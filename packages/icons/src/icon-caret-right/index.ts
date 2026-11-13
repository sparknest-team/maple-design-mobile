import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCaretRight from './icon-caret-right.vue'

export const IconCaretRight: IconComponent = Object.assign(_IconCaretRight, {
  install(app: App) { app.component(_IconCaretRight.name, _IconCaretRight) },
})
