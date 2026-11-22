import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBookmarkFill from './icon-bookmark-fill.vue'

export const IconBookmarkFill: IconComponent = Object.assign(_IconBookmarkFill, {
  install(app: App) { app.component(_IconBookmarkFill.name!, _IconBookmarkFill) },
})
