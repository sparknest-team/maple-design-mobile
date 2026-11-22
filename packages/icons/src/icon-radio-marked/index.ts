import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRadioMarked from './icon-radio-marked.vue'

export const IconRadioMarked: IconComponent = Object.assign(_IconRadioMarked, {
  install(app: App) { app.component(_IconRadioMarked.name!, _IconRadioMarked) },
})
