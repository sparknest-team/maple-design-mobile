import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSkipPrevious from './icon-skip-previous.vue'

export const IconSkipPrevious: IconComponent = Object.assign(_IconSkipPrevious, {
  install(app: App) { app.component(_IconSkipPrevious.name, _IconSkipPrevious) },
})
