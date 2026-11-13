import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMinus from './icon-minus.vue'

export const IconMinus: IconComponent = Object.assign(_IconMinus, {
  install(app: App) { app.component(_IconMinus.name, _IconMinus) },
})
