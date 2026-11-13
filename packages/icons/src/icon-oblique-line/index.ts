import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconObliqueLine from './icon-oblique-line.vue'

export const IconObliqueLine: IconComponent = Object.assign(_IconObliqueLine, {
  install(app: App) { app.component(_IconObliqueLine.name, _IconObliqueLine) },
})
