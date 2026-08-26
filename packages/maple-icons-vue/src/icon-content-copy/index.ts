import type { App } from 'vue'
import _IconContentCopy from './icon-content-copy.vue'

export const IconContentCopy = Object.assign(_IconContentCopy, {
  install(app: App) {
    app.component(_IconContentCopy.name, _IconContentCopy)
  },
})
