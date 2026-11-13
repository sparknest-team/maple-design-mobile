import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQuestionCircle from './icon-question-circle.vue'

export const IconQuestionCircle: IconComponent = Object.assign(_IconQuestionCircle, {
  install(app: App) { app.component(_IconQuestionCircle.name, _IconQuestionCircle) },
})
