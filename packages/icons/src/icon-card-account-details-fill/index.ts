import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCardAccountDetailsFill from './icon-card-account-details-fill.vue'

export const IconCardAccountDetailsFill: IconComponent = Object.assign(_IconCardAccountDetailsFill, {
  install(app: App) { app.component(_IconCardAccountDetailsFill.name, _IconCardAccountDetailsFill) },
})
