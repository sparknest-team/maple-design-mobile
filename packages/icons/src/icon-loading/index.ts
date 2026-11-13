import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLoading from './icon-loading.vue'

export const IconLoading: IconComponent = Object.assign(_IconLoading, {
  install(app: App) { app.component(_IconLoading.name, _IconLoading) },
})
