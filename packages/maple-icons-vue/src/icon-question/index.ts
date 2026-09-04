import type { App } from 'vue'
import _IconQuestion from './icon-question.vue'

export const IconQuestion = Object.assign(_IconQuestion, {
  install(app: App) {
    app.component(_IconQuestion.name, _IconQuestion)
  },
})
