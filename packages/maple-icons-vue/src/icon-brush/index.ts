import type { App } from 'vue'
import _IconBrush from './icon-brush.vue'

export const IconBrush = Object.assign(_IconBrush, {
  install(app: App) {
    app.component(_IconBrush.name, _IconBrush)
  },
})
