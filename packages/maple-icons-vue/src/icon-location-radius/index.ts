import type { App } from 'vue'
import _IconLocationRadius from './icon-location-radius.vue'

export const IconLocationRadius = Object.assign(_IconLocationRadius, {
  install(app: App) {
    app.component(_IconLocationRadius.name, _IconLocationRadius)
  },
})
