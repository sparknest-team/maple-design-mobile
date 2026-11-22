import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSafe from './icon-safe.vue'

export const IconSafe: IconComponent = Object.assign(_IconSafe, {
  install(app: App) { app.component(_IconSafe.name!, _IconSafe) },
})
