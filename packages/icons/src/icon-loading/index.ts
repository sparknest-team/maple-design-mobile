import type { App } from 'vue'
import _IconLoading from './icon-loading.vue'

export const IconLoading = Object.assign(_IconLoading, {
  install(app: App) { app.component(_IconLoading.name, _IconLoading) },
})
