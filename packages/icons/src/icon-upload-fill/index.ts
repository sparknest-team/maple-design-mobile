import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUploadFill from './icon-upload-fill.vue'

export const IconUploadFill: IconComponent = Object.assign(_IconUploadFill, {
  install(app: App) { app.component(_IconUploadFill.name!, _IconUploadFill) },
})
