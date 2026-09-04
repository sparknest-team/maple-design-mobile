import type { App } from 'vue'
import _IconBackward from './icon-backward.vue'

export const IconBackward = Object.assign(_IconBackward, {
  install(app: App) {
    app.component(_IconBackward.name, _IconBackward)
  },
})
