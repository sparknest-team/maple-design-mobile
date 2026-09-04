import type { App } from 'vue'
import _IconEdit from './icon-edit.vue'

export const IconEdit = Object.assign(_IconEdit, {
  install(app: App) {
    app.component(_IconEdit.name, _IconEdit)
  },
})
