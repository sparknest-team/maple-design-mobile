import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLiveBroadcast from './icon-live-broadcast.vue'

export const IconLiveBroadcast: IconComponent = Object.assign(_IconLiveBroadcast, {
  install(app: App) { app.component(_IconLiveBroadcast.name!, _IconLiveBroadcast) },
})
