import type { App } from 'vue'
import _IconDotsVertical from './icon-dots-vertical.vue'

export const IconDotsVertical = Object.assign(_IconDotsVertical, {
  install(app: App) {
    app.component(_IconDotsVertical.name, _IconDotsVertical)
  },
})
