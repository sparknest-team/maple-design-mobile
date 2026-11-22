import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPushpin from './icon-pushpin.vue'

export const IconPushpin: IconComponent = Object.assign(_IconPushpin, {
  install(app: App) { app.component(_IconPushpin.name!, _IconPushpin) },
})
