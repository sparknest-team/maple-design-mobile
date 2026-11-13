import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPublic from './icon-public.vue'

export const IconPublic: IconComponent = Object.assign(_IconPublic, {
  install(app: App) { app.component(_IconPublic.name, _IconPublic) },
})
