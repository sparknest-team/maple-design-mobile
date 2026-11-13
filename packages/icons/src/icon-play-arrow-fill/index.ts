import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPlayArrowFill from './icon-play-arrow-fill.vue'

export const IconPlayArrowFill: IconComponent = Object.assign(_IconPlayArrowFill, {
  install(app: App) { app.component(_IconPlayArrowFill.name, _IconPlayArrowFill) },
})
