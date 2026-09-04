import type { App } from 'vue'
import _IconCaretLeft from './icon-caret-left.vue'

export const IconCaretLeft = Object.assign(_IconCaretLeft, {
  install(app: App) {
    app.component(_IconCaretLeft.name, _IconCaretLeft)
  },
})
