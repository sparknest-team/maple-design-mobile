import type { App } from 'vue'
import _IconCalendarMonthFill from './icon-calendar-month-fill.vue'

export const IconCalendarMonthFill = Object.assign(_IconCalendarMonthFill, {
  install(app: App) {
    app.component(_IconCalendarMonthFill.name, _IconCalendarMonthFill)
  },
})
