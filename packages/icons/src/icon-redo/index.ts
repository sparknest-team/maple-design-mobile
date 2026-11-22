import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRedo from './icon-redo.vue'

export const IconRedo: IconComponent = Object.assign(_IconRedo, {
  install(app: App) { app.component(_IconRedo.name!, _IconRedo) },
})
