import type { App } from 'vue'
import _IconShareExternal from './icon-share-external.vue'

export const IconShareExternal = Object.assign(_IconShareExternal, {
  install(app: App) {
    app.component(_IconShareExternal.name, _IconShareExternal)
  },
})
