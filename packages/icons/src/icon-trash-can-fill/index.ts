import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTrashCanFill from './icon-trash-can-fill.vue'

export const IconTrashCanFill: IconComponent = Object.assign(_IconTrashCanFill, {
  install(app: App) { app.component(_IconTrashCanFill.name!, _IconTrashCanFill) },
})
