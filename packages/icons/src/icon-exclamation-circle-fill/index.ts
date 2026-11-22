import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconExclamationCircleFill from './icon-exclamation-circle-fill.vue'

export const IconExclamationCircleFill: IconComponent = Object.assign(_IconExclamationCircleFill, {
  install(app: App) { app.component(_IconExclamationCircleFill.name!, _IconExclamationCircleFill) },
})
