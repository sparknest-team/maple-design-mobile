import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUser from './icon-user.vue'

export const IconUser: IconComponent = Object.assign(_IconUser, {
  install(app: App) { app.component(_IconUser.name!, _IconUser) },
})
