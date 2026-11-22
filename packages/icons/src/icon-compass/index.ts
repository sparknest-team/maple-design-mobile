import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCompass from './icon-compass.vue'

export const IconCompass: IconComponent = Object.assign(_IconCompass, {
  install(app: App) { app.component(_IconCompass.name!, _IconCompass) },
})
