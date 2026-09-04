import type { App } from 'vue'
import _IconTrashCanFill from './icon-trash-can-fill.vue'

export const IconTrashCanFill = Object.assign(_IconTrashCanFill, {
  install(app: App) {
    app.component(_IconTrashCanFill.name, _IconTrashCanFill)
  },
})
