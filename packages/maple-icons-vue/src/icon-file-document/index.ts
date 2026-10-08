import type { App } from 'vue'
import _IconFileDocument from './icon-file-document.vue'

export const IconFileDocument = Object.assign(_IconFileDocument, {
  install(app: App) { app.component(_IconFileDocument.name, _IconFileDocument) },
})
