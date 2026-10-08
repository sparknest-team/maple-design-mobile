import type { App } from 'vue'
import _IconCaretDown from './icon-caret-down.vue'

export const IconCaretDown = Object.assign(_IconCaretDown, {
  install(app: App) { app.component(_IconCaretDown.name, _IconCaretDown) },
})
