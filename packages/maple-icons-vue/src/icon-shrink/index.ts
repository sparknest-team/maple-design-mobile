import type { App } from 'vue'
import _IconShrink from './icon-shrink.vue'

export const IconShrink = Object.assign(_IconShrink, {
  install(app: App) {
    app.component(_IconShrink.name, _IconShrink)
  },
})
