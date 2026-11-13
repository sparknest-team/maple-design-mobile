import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShareFill from './icon-share-fill.vue'

export const IconShareFill: IconComponent = Object.assign(_IconShareFill, {
  install(app: App) { app.component(_IconShareFill.name, _IconShareFill) },
})
