import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCaretDown from './icon-caret-down.vue'

export const IconCaretDown: IconComponent = Object.assign(_IconCaretDown, {
  install(app: App) { app.component(_IconCaretDown.name!, _IconCaretDown) },
})
