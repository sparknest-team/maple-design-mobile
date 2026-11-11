import type { App } from 'vue'
import _IconFindReplace from './icon-find-replace.vue'

export const IconFindReplace = Object.assign(_IconFindReplace, {
  install(app: App) { app.component(_IconFindReplace.name, _IconFindReplace) },
})
