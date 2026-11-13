import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShareExternal from './icon-share-external.vue'

export const IconShareExternal: IconComponent = Object.assign(_IconShareExternal, {
  install(app: App) { app.component(_IconShareExternal.name, _IconShareExternal) },
})
