import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSkipNext from './icon-skip-next.vue'

export const IconSkipNext: IconComponent = Object.assign(_IconSkipNext, {
  install(app: App) { app.component(_IconSkipNext.name!, _IconSkipNext) },
})
