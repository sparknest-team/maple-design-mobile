import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSave from './icon-save.vue'

export const IconSave: IconComponent = Object.assign(_IconSave, {
  install(app: App) { app.component(_IconSave.name, _IconSave) },
})
