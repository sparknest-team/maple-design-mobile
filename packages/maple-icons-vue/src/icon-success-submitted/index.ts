import type { App } from 'vue'
import _IconSuccessSubmitted from './icon-success-submitted.vue'

export const IconSuccessSubmitted = Object.assign(_IconSuccessSubmitted, {
  install(app: App) {
    app.component(_IconSuccessSubmitted.name, _IconSuccessSubmitted)
  },
})
