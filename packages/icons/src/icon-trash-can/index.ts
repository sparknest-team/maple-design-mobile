import type { App } from 'vue'
import _IconTrashCan from './icon-trash-can.vue'

export const IconTrashCan = Object.assign(_IconTrashCan, {
  install(app: App) { app.component(_IconTrashCan.name, _IconTrashCan) },
})
