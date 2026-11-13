import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSubscribe from './icon-subscribe.vue'

export const IconSubscribe: IconComponent = Object.assign(_IconSubscribe, {
  install(app: App) { app.component(_IconSubscribe.name, _IconSubscribe) },
})
