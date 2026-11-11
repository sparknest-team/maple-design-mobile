import type { App } from 'vue'
import _IconUserGroup from './icon-user-group.vue'

export const IconUserGroup = Object.assign(_IconUserGroup, {
  install(app: App) { app.component(_IconUserGroup.name, _IconUserGroup) },
})
