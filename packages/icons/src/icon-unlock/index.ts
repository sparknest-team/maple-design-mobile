import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUnlock from './icon-unlock.vue'

export const IconUnlock: IconComponent = Object.assign(_IconUnlock, {
  install(app: App) { app.component(_IconUnlock.name!, _IconUnlock) },
})
