import type { App } from 'vue'
import _IconStorage from './icon-storage.vue'

export const IconStorage = Object.assign(_IconStorage, {
  install(app: App) {
    app.component(_IconStorage.name, _IconStorage)
  },
})
