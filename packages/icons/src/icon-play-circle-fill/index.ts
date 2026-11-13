import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPlayCircleFill from './icon-play-circle-fill.vue'

export const IconPlayCircleFill: IconComponent = Object.assign(_IconPlayCircleFill, {
  install(app: App) { app.component(_IconPlayCircleFill.name, _IconPlayCircleFill) },
})
