import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSync from './icon-sync.vue'

export const IconSync: IconComponent = Object.assign(_IconSync, {
  install(app: App) { app.component(_IconSync.name!, _IconSync) },
})
