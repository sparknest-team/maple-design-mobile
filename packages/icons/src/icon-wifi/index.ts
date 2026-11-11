import type { App } from 'vue'
import _IconWifi from './icon-wifi.vue'

export const IconWifi = Object.assign(_IconWifi, {
  install(app: App) { app.component(_IconWifi.name, _IconWifi) },
})
