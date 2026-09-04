import type { App } from 'vue'
import _IconQuestionCircleFill from './icon-question-circle-fill.vue'

export const IconQuestionCircleFill = Object.assign(_IconQuestionCircleFill, {
  install(app: App) {
    app.component(_IconQuestionCircleFill.name, _IconQuestionCircleFill)
  },
})
