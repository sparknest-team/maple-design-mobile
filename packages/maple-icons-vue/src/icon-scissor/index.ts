import type { App } from 'vue'
import _IconScissor from './icon-scissor.vue'

export const IconScissor = Object.assign(_IconScissor, {
  install(app: App) {
    app.component(_IconScissor.name, _IconScissor)
  },
})
