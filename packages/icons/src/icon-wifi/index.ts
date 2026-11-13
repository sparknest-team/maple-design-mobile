import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWifi from './icon-wifi.vue'

export const IconWifi: IconComponent = Object.assign(_IconWifi, {
  install(app: App) { app.component(_IconWifi.name, _IconWifi) },
})
