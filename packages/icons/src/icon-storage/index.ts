import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconStorage from './icon-storage.vue'

export const IconStorage: IconComponent = Object.assign(_IconStorage, {
  install(app: App) { app.component(_IconStorage.name!, _IconStorage) },
})
