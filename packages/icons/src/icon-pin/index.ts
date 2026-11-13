import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPin from './icon-pin.vue'

export const IconPin: IconComponent = Object.assign(_IconPin, {
  install(app: App) { app.component(_IconPin.name, _IconPin) },
})
