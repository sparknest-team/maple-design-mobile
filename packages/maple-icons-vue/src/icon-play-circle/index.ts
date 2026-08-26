import type { App } from 'vue'
import _IconPlayCircle from './icon-play-circle.vue'

export const IconPlayCircle = Object.assign(_IconPlayCircle, {
  install(app: App) {
    app.component(_IconPlayCircle.name, _IconPlayCircle)
  },
})
