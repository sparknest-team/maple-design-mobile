import type { App } from 'vue'
import _IconLiveBroadcast from './icon-live-broadcast.vue'

export const IconLiveBroadcast = Object.assign(_IconLiveBroadcast, {
  install(app: App) { app.component(_IconLiveBroadcast.name, _IconLiveBroadcast) },
})
