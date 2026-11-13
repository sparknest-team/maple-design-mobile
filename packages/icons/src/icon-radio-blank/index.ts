import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRadioBlank from './icon-radio-blank.vue'

export const IconRadioBlank: IconComponent = Object.assign(_IconRadioBlank, {
  install(app: App) { app.component(_IconRadioBlank.name, _IconRadioBlank) },
})
