import type { App } from 'vue'
import _IconSubscribed from './icon-subscribed.vue'

export const IconSubscribed = Object.assign(_IconSubscribed, {
  install(app: App) { app.component(_IconSubscribed.name, _IconSubscribed) },
})
