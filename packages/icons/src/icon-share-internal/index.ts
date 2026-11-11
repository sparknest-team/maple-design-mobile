import type { App } from 'vue'
import _IconShareInternal from './icon-share-internal.vue'

export const IconShareInternal = Object.assign(_IconShareInternal, {
  install(app: App) { app.component(_IconShareInternal.name, _IconShareInternal) },
})
