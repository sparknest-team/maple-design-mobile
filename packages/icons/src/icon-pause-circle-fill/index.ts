import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPauseCircleFill from './icon-pause-circle-fill.vue'

export const IconPauseCircleFill: IconComponent = Object.assign(_IconPauseCircleFill, {
  install(app: App) { app.component(_IconPauseCircleFill.name!, _IconPauseCircleFill) },
})
