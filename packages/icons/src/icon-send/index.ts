import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSend from './icon-send.vue'

export const IconSend: IconComponent = Object.assign(_IconSend, {
  install(app: App) { app.component(_IconSend.name, _IconSend) },
})
