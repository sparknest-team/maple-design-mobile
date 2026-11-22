import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUserAdd from './icon-user-add.vue'

export const IconUserAdd: IconComponent = Object.assign(_IconUserAdd, {
  install(app: App) { app.component(_IconUserAdd.name!, _IconUserAdd) },
})
