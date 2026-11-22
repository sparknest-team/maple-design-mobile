import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTags from './icon-tags.vue'

export const IconTags: IconComponent = Object.assign(_IconTags, {
  install(app: App) { app.component(_IconTags.name!, _IconTags) },
})
