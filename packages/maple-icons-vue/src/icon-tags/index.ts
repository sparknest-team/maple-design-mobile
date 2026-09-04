import type { App } from 'vue'
import _IconTags from './icon-tags.vue'

export const IconTags = Object.assign(_IconTags, {
  install(app: App) {
    app.component(_IconTags.name, _IconTags)
  },
})
