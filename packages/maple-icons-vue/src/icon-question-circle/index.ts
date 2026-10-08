import type { App } from 'vue'
import _IconQuestionCircle from './icon-question-circle.vue'

export const IconQuestionCircle = Object.assign(_IconQuestionCircle, {
  install(app: App) { app.component(_IconQuestionCircle.name, _IconQuestionCircle) },
})
