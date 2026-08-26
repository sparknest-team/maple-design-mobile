import type { App } from 'vue'
import _IconCardAccountDetails from './icon-card-account-details.vue'

export const IconCardAccountDetails = Object.assign(_IconCardAccountDetails, {
  install(app: App) {
    app.component(_IconCardAccountDetails.name, _IconCardAccountDetails)
  },
})
