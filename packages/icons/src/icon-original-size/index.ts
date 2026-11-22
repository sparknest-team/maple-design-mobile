import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconOriginalSize from './icon-original-size.vue'

export const IconOriginalSize: IconComponent = Object.assign(_IconOriginalSize, {
  install(app: App) { app.component(_IconOriginalSize.name!, _IconOriginalSize) },
})
