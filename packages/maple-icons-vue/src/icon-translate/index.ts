import type { App } from 'vue'
import _IconTranslate from './icon-translate.vue'

export const IconTranslate = Object.assign(_IconTranslate, {
  install(app: App) {
    app.component(_IconTranslate.name, _IconTranslate)
  },
})
