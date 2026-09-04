import type { App } from 'vue'
import _IconCalendar from './icon-calendar.vue'

export const IconCalendar = Object.assign(_IconCalendar, {
  install(app: App) {
    app.component(_IconCalendar.name, _IconCalendar)
  },
})
