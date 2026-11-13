import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQuestion from './icon-question.vue'

export const IconQuestion: IconComponent = Object.assign(_IconQuestion, {
  install(app: App) { app.component(_IconQuestion.name, _IconQuestion) },
})
