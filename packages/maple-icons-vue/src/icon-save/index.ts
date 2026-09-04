import type { App } from 'vue'
import _IconSave from './icon-save.vue'

export const IconSave = Object.assign(_IconSave, {
  install(app: App) {
    app.component(_IconSave.name, _IconSave)
  },
})
