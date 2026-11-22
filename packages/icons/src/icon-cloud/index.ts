import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCloud from './icon-cloud.vue'

export const IconCloud: IconComponent = Object.assign(_IconCloud, {
  install(app: App) { app.component(_IconCloud.name!, _IconCloud) },
})
