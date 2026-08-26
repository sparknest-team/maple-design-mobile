import type { App } from 'vue'
import _IconCardAccountDetailsOutline from './icon-card-account-details-outline.vue'

export const IconCardAccountDetailsOutline = Object.assign(_IconCardAccountDetailsOutline, {
  install(app: App) {
    app.component(_IconCardAccountDetailsOutline.name, _IconCardAccountDetailsOutline)
  },
})
