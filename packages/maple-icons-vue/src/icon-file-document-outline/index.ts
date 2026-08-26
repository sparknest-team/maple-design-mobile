import type { App } from 'vue'
import _IconFileDocumentOutline from './icon-file-document-outline.vue'

export const IconFileDocumentOutline = Object.assign(_IconFileDocumentOutline, {
  install(app: App) {
    app.component(_IconFileDocumentOutline.name, _IconFileDocumentOutline)
  },
})
