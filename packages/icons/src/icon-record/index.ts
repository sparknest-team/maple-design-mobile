import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRecord from './icon-record.vue'

export const IconRecord: IconComponent = Object.assign(_IconRecord, {
  install(app: App) { app.component(_IconRecord.name!, _IconRecord) },
})
