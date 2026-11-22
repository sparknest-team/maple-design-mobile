import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconShrink from './icon-shrink.vue'

export const IconShrink: IconComponent = Object.assign(_IconShrink, {
  install(app: App) { app.component(_IconShrink.name!, _IconShrink) },
})
