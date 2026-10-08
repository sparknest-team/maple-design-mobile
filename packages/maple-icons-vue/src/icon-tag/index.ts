import type { App } from 'vue'
import _IconTag from './icon-tag.vue'

export const IconTag = Object.assign(_IconTag, {
  install(app: App) { app.component(_IconTag.name, _IconTag) },
})
