import type { App } from 'vue'
import _IconCog from './icon-cog.vue'

export const IconCog = Object.assign(_IconCog, {
  install(app: App) {
    app.component(_IconCog.name, _IconCog)
  },
})
