import type { App } from 'vue'
import _IconPublic from './icon-public.vue'

export const IconPublic = Object.assign(_IconPublic, {
  install(app: App) { app.component(_IconPublic.name, _IconPublic) },
})
