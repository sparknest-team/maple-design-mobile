import type { App } from 'vue'
import _IconCellphone from './icon-cellphone.vue'

export const IconCellphone = Object.assign(_IconCellphone, {
  install(app: App) {
    app.component(_IconCellphone.name, _IconCellphone)
  },
})
