import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCalendarMonth from './icon-calendar-month.vue'

export const IconCalendarMonth: IconComponent = Object.assign(_IconCalendarMonth, {
  install(app: App) { app.component(_IconCalendarMonth.name, _IconCalendarMonth) },
})
