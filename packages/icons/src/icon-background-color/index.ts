import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBackgroundColor from './icon-background-color.vue'

export const IconBackgroundColor: IconComponent = Object.assign(_IconBackgroundColor, {
  install(app: App) { app.component(_IconBackgroundColor.name!, _IconBackgroundColor) },
})
