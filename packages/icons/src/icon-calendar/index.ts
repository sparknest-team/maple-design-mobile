import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCalendar from './icon-calendar.vue'

export const IconCalendar: IconComponent = Object.assign(_IconCalendar, {
  install(app: App) { app.component(_IconCalendar.name!, _IconCalendar) },
})
