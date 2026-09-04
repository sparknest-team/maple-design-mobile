import type { App } from 'vue'
import _IconPlayArrow from './icon-play-arrow.vue'

export const IconPlayArrow = Object.assign(_IconPlayArrow, {
  install(app: App) {
    app.component(_IconPlayArrow.name, _IconPlayArrow)
  },
})
