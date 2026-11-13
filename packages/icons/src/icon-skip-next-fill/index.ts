import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSkipNextFill from './icon-skip-next-fill.vue'

export const IconSkipNextFill: IconComponent = Object.assign(_IconSkipNextFill, {
  install(app: App) { app.component(_IconSkipNextFill.name, _IconSkipNextFill) },
})
