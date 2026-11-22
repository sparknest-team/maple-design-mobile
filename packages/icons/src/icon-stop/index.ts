import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconStop from './icon-stop.vue'

export const IconStop: IconComponent = Object.assign(_IconStop, {
  install(app: App) { app.component(_IconStop.name!, _IconStop) },
})
