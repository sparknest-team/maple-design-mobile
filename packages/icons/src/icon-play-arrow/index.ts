import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPlayArrow from './icon-play-arrow.vue'

export const IconPlayArrow: IconComponent = Object.assign(_IconPlayArrow, {
  install(app: App) { app.component(_IconPlayArrow.name, _IconPlayArrow) },
})
