import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEdit from './icon-edit.vue'

export const IconEdit: IconComponent = Object.assign(_IconEdit, {
  install(app: App) { app.component(_IconEdit.name!, _IconEdit) },
})
