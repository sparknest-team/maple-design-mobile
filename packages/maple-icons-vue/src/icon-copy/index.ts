import type { App } from 'vue'
import _IconCopy from './icon-copy.vue'

export const IconCopy = Object.assign(_IconCopy, {
  install(app: App) {
    app.component(_IconCopy.name, _IconCopy)
  },
})
