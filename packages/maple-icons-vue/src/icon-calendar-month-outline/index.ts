import type { App } from 'vue'
import _IconCalendarMonthOutline from './icon-calendar-month-outline.vue'

export const IconCalendarMonthOutline = Object.assign(_IconCalendarMonthOutline, {
  install(app: App) {
    app.component(_IconCalendarMonthOutline.name, _IconCalendarMonthOutline)
  },
})
