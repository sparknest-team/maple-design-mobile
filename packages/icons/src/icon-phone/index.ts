import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPhone from './icon-phone.vue'

export const IconPhone: IconComponent = Object.assign(_IconPhone, {
  install(app: App) { app.component(_IconPhone.name, _IconPhone) },
})
