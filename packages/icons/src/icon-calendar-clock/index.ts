import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCalendarClock from './icon-calendar-clock.vue'

export const IconCalendarClock: IconComponent = Object.assign(_IconCalendarClock, {
  install(app: App) { app.component(_IconCalendarClock.name, _IconCalendarClock) },
})
