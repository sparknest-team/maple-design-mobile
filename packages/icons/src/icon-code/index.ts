import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCode from './icon-code.vue'

export const IconCode: IconComponent = Object.assign(_IconCode, {
  install(app: App) { app.component(_IconCode.name, _IconCode) },
})
