import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFindReplace from './icon-find-replace.vue'

export const IconFindReplace: IconComponent = Object.assign(_IconFindReplace, {
  install(app: App) { app.component(_IconFindReplace.name, _IconFindReplace) },
})
