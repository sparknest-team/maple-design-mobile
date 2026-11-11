import type { App } from 'vue'
import _IconClockCircle from './icon-clock-circle.vue'

export const IconClockCircle = Object.assign(_IconClockCircle, {
  install(app: App) { app.component(_IconClockCircle.name, _IconClockCircle) },
})
