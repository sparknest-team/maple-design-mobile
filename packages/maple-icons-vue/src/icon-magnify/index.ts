import type { App } from 'vue'
import _IconMagnify from './icon-magnify.vue'

export const IconMagnify = Object.assign(_IconMagnify, {
  install(app: App) {
    app.component(_IconMagnify.name, _IconMagnify)
  },
})
