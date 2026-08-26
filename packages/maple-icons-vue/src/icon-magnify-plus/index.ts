import type { App } from 'vue'
import _IconMagnifyPlus from './icon-magnify-plus.vue'

export const IconMagnifyPlus = Object.assign(_IconMagnifyPlus, {
  install(app: App) {
    app.component(_IconMagnifyPlus.name, _IconMagnifyPlus)
  },
})
