import type { App } from 'vue'
import _IconSkipNext from './icon-skip-next.vue'

export const IconSkipNext = Object.assign(_IconSkipNext, {
  install(app: App) {
    app.component(_IconSkipNext.name, _IconSkipNext)
  },
})
