import type { App } from 'vue'
import _IconBookmarkOutline from './icon-bookmark-outline.vue'

export const IconBookmarkOutline = Object.assign(_IconBookmarkOutline, {
  install(app: App) {
    app.component(_IconBookmarkOutline.name, _IconBookmarkOutline)
  },
})
