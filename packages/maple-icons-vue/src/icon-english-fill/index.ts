import type { App } from 'vue'
import _IconEnglishFill from './icon-english-fill.vue'

export const IconEnglishFill = Object.assign(_IconEnglishFill, {
  install(app: App) {
    app.component(_IconEnglishFill.name, _IconEnglishFill)
  },
})
