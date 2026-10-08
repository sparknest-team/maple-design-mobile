import type { App } from 'vue'
import _IconCalendarClock from './icon-calendar-clock.vue'

export const IconCalendarClock = Object.assign(_IconCalendarClock, {
  install(app: App) { app.component(_IconCalendarClock.name, _IconCalendarClock) },
})
