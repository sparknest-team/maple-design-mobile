import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMuteFill from './icon-mute-fill.vue'

export const IconMuteFill: IconComponent = Object.assign(_IconMuteFill, {
  install(app: App) { app.component(_IconMuteFill.name, _IconMuteFill) },
})
