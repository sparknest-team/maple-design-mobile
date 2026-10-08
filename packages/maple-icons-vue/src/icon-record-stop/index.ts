import type { App } from 'vue'
import _IconRecordStop from './icon-record-stop.vue'

export const IconRecordStop = Object.assign(_IconRecordStop, {
  install(app: App) { app.component(_IconRecordStop.name, _IconRecordStop) },
})
