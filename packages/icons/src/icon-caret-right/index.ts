import type { App } from 'vue'
import _IconCaretRight from './icon-caret-right.vue'

export const IconCaretRight = Object.assign(_IconCaretRight, {
  install(app: App) { app.component(_IconCaretRight.name, _IconCaretRight) },
})
