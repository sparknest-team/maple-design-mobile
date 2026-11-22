import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSuccessSubmitted from './icon-success-submitted.vue'

export const IconSuccessSubmitted: IconComponent = Object.assign(_IconSuccessSubmitted, {
  install(app: App) { app.component(_IconSuccessSubmitted.name!, _IconSuccessSubmitted) },
})
