import type { App } from 'vue'
import _IconAttachment from './icon-attachment.vue'

export const IconAttachment = Object.assign(_IconAttachment, {
  install(app: App) { app.component(_IconAttachment.name, _IconAttachment) },
})
