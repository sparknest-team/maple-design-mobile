import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPhoneFill from './icon-phone-fill.vue'

export const IconPhoneFill: IconComponent = Object.assign(_IconPhoneFill, {
  install(app: App) { app.component(_IconPhoneFill.name, _IconPhoneFill) },
})
