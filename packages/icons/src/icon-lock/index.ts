import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLock from './icon-lock.vue'

export const IconLock: IconComponent = Object.assign(_IconLock, {
  install(app: App) { app.component(_IconLock.name!, _IconLock) },
})
