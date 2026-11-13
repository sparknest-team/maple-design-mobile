import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShareAlt from './icon-share-alt.vue'

export const IconShareAlt: IconComponent = Object.assign(_IconShareAlt, {
  install(app: App) { app.component(_IconShareAlt.name, _IconShareAlt) },
})
