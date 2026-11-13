import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPlus from './icon-plus.vue'

export const IconPlus: IconComponent = Object.assign(_IconPlus, {
  install(app: App) { app.component(_IconPlus.name, _IconPlus) },
})
