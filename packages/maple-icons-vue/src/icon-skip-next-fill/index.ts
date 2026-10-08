import type { App } from 'vue'
import _IconSkipNextFill from './icon-skip-next-fill.vue'

export const IconSkipNextFill = Object.assign(_IconSkipNextFill, {
  install(app: App) { app.component(_IconSkipNextFill.name, _IconSkipNextFill) },
})
