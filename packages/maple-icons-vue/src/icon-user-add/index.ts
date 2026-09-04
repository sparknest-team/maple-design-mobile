import type { App } from 'vue'
import _IconUserAdd from './icon-user-add.vue'

export const IconUserAdd = Object.assign(_IconUserAdd, {
  install(app: App) {
    app.component(_IconUserAdd.name, _IconUserAdd)
  },
})
