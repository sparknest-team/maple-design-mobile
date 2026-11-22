import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRecordStop from './icon-record-stop.vue'

export const IconRecordStop: IconComponent = Object.assign(_IconRecordStop, {
  install(app: App) { app.component(_IconRecordStop.name!, _IconRecordStop) },
})
