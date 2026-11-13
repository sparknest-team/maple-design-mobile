import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCardAccountDetails from './icon-card-account-details.vue'

export const IconCardAccountDetails: IconComponent = Object.assign(_IconCardAccountDetails, {
  install(app: App) { app.component(_IconCardAccountDetails.name, _IconCardAccountDetails) },
})
