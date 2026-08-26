import type { App } from 'vue'
import _IconPlayCircleOutline from './icon-play-circle-outline.vue'

export const IconPlayCircleOutline = Object.assign(_IconPlayCircleOutline, {
  install(app: App) {
    app.component(_IconPlayCircleOutline.name, _IconPlayCircleOutline)
  },
})
