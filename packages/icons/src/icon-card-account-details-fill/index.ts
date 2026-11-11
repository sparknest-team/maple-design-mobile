import type { App } from 'vue'
import _IconCardAccountDetailsFill from './icon-card-account-details-fill.vue'

export const IconCardAccountDetailsFill = Object.assign(_IconCardAccountDetailsFill, {
  install(app: App) { app.component(_IconCardAccountDetailsFill.name, _IconCardAccountDetailsFill) },
})
