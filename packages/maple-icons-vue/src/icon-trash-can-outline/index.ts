import type { App } from 'vue'
import _IconTrashCanOutline from './icon-trash-can-outline.vue'

export const IconTrashCanOutline = Object.assign(_IconTrashCanOutline, {
  install(app: App) {
    app.component(_IconTrashCanOutline.name, _IconTrashCanOutline)
  },
})
