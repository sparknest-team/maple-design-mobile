import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPower from './icon-power.vue'

export const IconPower: IconComponent = Object.assign(_IconPower, {
  install(app: App) { app.component(_IconPower.name, _IconPower) },
})
