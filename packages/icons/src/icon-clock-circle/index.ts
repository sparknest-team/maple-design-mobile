import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconClockCircle from './icon-clock-circle.vue'

export const IconClockCircle: IconComponent = Object.assign(_IconClockCircle, {
  install(app: App) { app.component(_IconClockCircle.name!, _IconClockCircle) },
})
