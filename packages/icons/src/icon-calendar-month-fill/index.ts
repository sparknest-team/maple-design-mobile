import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCalendarMonthFill from './icon-calendar-month-fill.vue'

export const IconCalendarMonthFill: IconComponent = Object.assign(_IconCalendarMonthFill, {
  install(app: App) { app.component(_IconCalendarMonthFill.name, _IconCalendarMonthFill) },
})
