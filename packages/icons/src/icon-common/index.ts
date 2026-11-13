import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCommon from './icon-common.vue'

export const IconCommon: IconComponent = Object.assign(_IconCommon, {
  install(app: App) { app.component(_IconCommon.name, _IconCommon) },
})
