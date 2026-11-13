import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconInfoCircleFill from './icon-info-circle-fill.vue'

export const IconInfoCircleFill: IconComponent = Object.assign(_IconInfoCircleFill, {
  install(app: App) { app.component(_IconInfoCircleFill.name, _IconInfoCircleFill) },
})
