import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShake from './icon-shake.vue'

export const IconShake: IconComponent = Object.assign(_IconShake, {
  install(app: App) { app.component(_IconShake.name, _IconShake) },
})
