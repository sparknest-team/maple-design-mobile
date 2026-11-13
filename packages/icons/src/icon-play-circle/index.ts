import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPlayCircle from './icon-play-circle.vue'

export const IconPlayCircle: IconComponent = Object.assign(_IconPlayCircle, {
  install(app: App) { app.component(_IconPlayCircle.name, _IconPlayCircle) },
})
