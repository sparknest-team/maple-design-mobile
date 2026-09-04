import type { App } from 'vue'
import _IconShareAlt from './icon-share-alt.vue'

export const IconShareAlt = Object.assign(_IconShareAlt, {
  install(app: App) {
    app.component(_IconShareAlt.name, _IconShareAlt)
  },
})
