import type { App } from 'vue'
import _IconPoweroff from './icon-poweroff.vue'

export const IconPoweroff = Object.assign(_IconPoweroff, {
  install(app: App) { app.component(_IconPoweroff.name, _IconPoweroff) },
})
