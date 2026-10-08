import type { App } from 'vue'
import _IconSubscribe from './icon-subscribe.vue'

export const IconSubscribe = Object.assign(_IconSubscribe, {
  install(app: App) { app.component(_IconSubscribe.name, _IconSubscribe) },
})
