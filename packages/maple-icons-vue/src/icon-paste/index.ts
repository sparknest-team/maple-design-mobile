import type { App } from 'vue'
import _IconPaste from './icon-paste.vue'

export const IconPaste = Object.assign(_IconPaste, {
  install(app: App) {
    app.component(_IconPaste.name, _IconPaste)
  },
})
