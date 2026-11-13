import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCaretLeft from './icon-caret-left.vue'

export const IconCaretLeft: IconComponent = Object.assign(_IconCaretLeft, {
  install(app: App) { app.component(_IconCaretLeft.name, _IconCaretLeft) },
})
