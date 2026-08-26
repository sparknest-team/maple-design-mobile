import type { App } from 'vue'
import _IconBellOutline from './icon-bell-outline.vue'

export const IconBellOutline = Object.assign(_IconBellOutline, {
  install(app: App) {
    app.component(_IconBellOutline.name, _IconBellOutline)
  },
})
