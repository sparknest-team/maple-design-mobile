import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconStrikethrough from './icon-strikethrough.vue'

export const IconStrikethrough: IconComponent = Object.assign(_IconStrikethrough, {
  install(app: App) { app.component(_IconStrikethrough.name!, _IconStrikethrough) },
})
