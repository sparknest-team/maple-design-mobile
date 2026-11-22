import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBackward from './icon-backward.vue'

export const IconBackward: IconComponent = Object.assign(_IconBackward, {
  install(app: App) { app.component(_IconBackward.name!, _IconBackward) },
})
