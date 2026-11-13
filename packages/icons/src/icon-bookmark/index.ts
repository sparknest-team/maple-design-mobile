import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBookmark from './icon-bookmark.vue'

export const IconBookmark: IconComponent = Object.assign(_IconBookmark, {
  install(app: App) { app.component(_IconBookmark.name, _IconBookmark) },
})
