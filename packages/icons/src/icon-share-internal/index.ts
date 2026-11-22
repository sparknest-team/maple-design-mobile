import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShareInternal from './icon-share-internal.vue'

export const IconShareInternal: IconComponent = Object.assign(_IconShareInternal, {
  install(app: App) { app.component(_IconShareInternal.name!, _IconShareInternal) },
})
