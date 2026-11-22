import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMore from './icon-more.vue'

export const IconMore: IconComponent = Object.assign(_IconMore, {
  install(app: App) { app.component(_IconMore.name!, _IconMore) },
})
