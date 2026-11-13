import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPoweroff from './icon-poweroff.vue'

export const IconPoweroff: IconComponent = Object.assign(_IconPoweroff, {
  install(app: App) { app.component(_IconPoweroff.name, _IconPoweroff) },
})
