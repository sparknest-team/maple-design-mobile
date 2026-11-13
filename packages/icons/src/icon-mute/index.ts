import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMute from './icon-mute.vue'

export const IconMute: IconComponent = Object.assign(_IconMute, {
  install(app: App) { app.component(_IconMute.name, _IconMute) },
})
