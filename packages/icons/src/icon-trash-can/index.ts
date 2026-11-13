import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTrashCan from './icon-trash-can.vue'

export const IconTrashCan: IconComponent = Object.assign(_IconTrashCan, {
  install(app: App) { app.component(_IconTrashCan.name, _IconTrashCan) },
})
