import type { App } from 'vue'
import _IconSkipPrevious from './icon-skip-previous.vue'

export const IconSkipPrevious = Object.assign(_IconSkipPrevious, {
  install(app: App) { app.component(_IconSkipPrevious.name, _IconSkipPrevious) },
})
