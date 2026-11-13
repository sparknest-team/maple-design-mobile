import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShare from './icon-share.vue'

export const IconShare: IconComponent = Object.assign(_IconShare, {
  install(app: App) { app.component(_IconShare.name, _IconShare) },
})
