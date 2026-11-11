import type { App } from 'vue'
import _IconSchedule from './icon-schedule.vue'

export const IconSchedule = Object.assign(_IconSchedule, {
  install(app: App) { app.component(_IconSchedule.name, _IconSchedule) },
})
