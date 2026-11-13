import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconStamp from './icon-stamp.vue'

export const IconStamp: IconComponent = Object.assign(_IconStamp, {
  install(app: App) { app.component(_IconStamp.name, _IconStamp) },
})
