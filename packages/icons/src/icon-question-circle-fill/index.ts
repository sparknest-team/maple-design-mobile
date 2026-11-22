import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQuestionCircleFill from './icon-question-circle-fill.vue'

export const IconQuestionCircleFill: IconComponent = Object.assign(_IconQuestionCircleFill, {
  install(app: App) { app.component(_IconQuestionCircleFill.name!, _IconQuestionCircleFill) },
})
