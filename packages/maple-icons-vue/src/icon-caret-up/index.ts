import type { App } from 'vue'
import _IconCaretUp from './icon-caret-up.vue'

export const IconCaretUp = Object.assign(_IconCaretUp, {
  install(app: App) {
    app.component(_IconCaretUp.name, _IconCaretUp)
  },
})
