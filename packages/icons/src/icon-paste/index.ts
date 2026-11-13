import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPaste from './icon-paste.vue'

export const IconPaste: IconComponent = Object.assign(_IconPaste, {
  install(app: App) { app.component(_IconPaste.name, _IconPaste) },
})
