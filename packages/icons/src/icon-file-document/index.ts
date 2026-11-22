import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFileDocument from './icon-file-document.vue'

export const IconFileDocument: IconComponent = Object.assign(_IconFileDocument, {
  install(app: App) { app.component(_IconFileDocument.name!, _IconFileDocument) },
})
