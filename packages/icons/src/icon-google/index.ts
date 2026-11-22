import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconGoogle from './icon-google.vue'

export const IconGoogle: IconComponent = Object.assign(_IconGoogle, {
  install(app: App) { app.component(_IconGoogle.name!, _IconGoogle) },
})
