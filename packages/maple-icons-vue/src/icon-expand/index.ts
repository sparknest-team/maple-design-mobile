import type { App } from 'vue'
import _IconExpand from './icon-expand.vue'

export const IconExpand = Object.assign(_IconExpand, {
  install(app: App) {
    app.component(_IconExpand.name, _IconExpand)
  },
})
