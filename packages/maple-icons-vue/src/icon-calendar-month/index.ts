import type { App } from 'vue'
import _IconCalendarMonth from './icon-calendar-month.vue'

export const IconCalendarMonth = Object.assign(_IconCalendarMonth, {
  install(app: App) {
    app.component(_IconCalendarMonth.name, _IconCalendarMonth)
  },
})
