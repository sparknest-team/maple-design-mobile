import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUserGroup from './icon-user-group.vue'

export const IconUserGroup: IconComponent = Object.assign(_IconUserGroup, {
  install(app: App) { app.component(_IconUserGroup.name, _IconUserGroup) },
})
