import type { App } from 'vue'
import _IconEmail from './icon-email.vue'

export const IconEmail = Object.assign(_IconEmail, {
  install(app: App) {
    app.component(_IconEmail.name, _IconEmail)
  },
})
