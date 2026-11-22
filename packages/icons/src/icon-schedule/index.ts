import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSchedule from './icon-schedule.vue'

export const IconSchedule: IconComponent = Object.assign(_IconSchedule, {
  install(app: App) { app.component(_IconSchedule.name!, _IconSchedule) },
})
