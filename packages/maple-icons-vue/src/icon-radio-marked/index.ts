import type { App } from 'vue'
import _IconRadioMarked from './icon-radio-marked.vue'

export const IconRadioMarked = Object.assign(_IconRadioMarked, {
  install(app: App) {
    app.component(_IconRadioMarked.name, _IconRadioMarked)
  },
})
