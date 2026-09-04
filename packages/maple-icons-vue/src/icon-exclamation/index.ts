import type { App } from 'vue'
import _IconExclamation from './icon-exclamation.vue'

export const IconExclamation = Object.assign(_IconExclamation, {
  install(app: App) {
    app.component(_IconExclamation.name, _IconExclamation)
  },
})
