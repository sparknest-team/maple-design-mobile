import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBug from './icon-bug.vue'

export const IconBug: IconComponent = Object.assign(_IconBug, {
  install(app: App) { app.component(_IconBug.name, _IconBug) },
})
