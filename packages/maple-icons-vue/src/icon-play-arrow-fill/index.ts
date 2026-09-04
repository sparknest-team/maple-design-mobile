import type { App } from 'vue'
import _IconPlayArrowFill from './icon-play-arrow-fill.vue'

export const IconPlayArrowFill = Object.assign(_IconPlayArrowFill, {
  install(app: App) {
    app.component(_IconPlayArrowFill.name, _IconPlayArrowFill)
  },
})
