import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTag from './icon-tag.vue'

export const IconTag: IconComponent = Object.assign(_IconTag, {
  install(app: App) { app.component(_IconTag.name!, _IconTag) },
})
