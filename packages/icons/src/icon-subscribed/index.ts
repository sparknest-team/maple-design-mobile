import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSubscribed from './icon-subscribed.vue'

export const IconSubscribed: IconComponent = Object.assign(_IconSubscribed, {
  install(app: App) { app.component(_IconSubscribed.name, _IconSubscribed) },
})
