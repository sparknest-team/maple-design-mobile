import type { App } from 'vue'
import _IconBookmarkFill from './icon-bookmark-fill.vue'

export const IconBookmarkFill = Object.assign(_IconBookmarkFill, {
  install(app: App) {
    app.component(_IconBookmarkFill.name, _IconBookmarkFill)
  },
})
