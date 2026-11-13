import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAttachment from './icon-attachment.vue'

export const IconAttachment: IconComponent = Object.assign(_IconAttachment, {
  install(app: App) { app.component(_IconAttachment.name, _IconAttachment) },
})
