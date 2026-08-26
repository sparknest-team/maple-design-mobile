import type { App } from 'vue'
import _IconRadioBlank from './icon-radio-blank.vue'

export const IconRadioBlank = Object.assign(_IconRadioBlank, {
  install(app: App) {
    app.component(_IconRadioBlank.name, _IconRadioBlank)
  },
})
