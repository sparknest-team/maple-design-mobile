import type { App } from 'vue'
import _IconQq from './icon-qq.vue'

export const IconQq = Object.assign(_IconQq, {
  install(app: App) { app.component(_IconQq.name, _IconQq) },
})
