import type { App } from 'vue'
import _IconTwitter from './icon-twitter.vue'

export const IconTwitter = Object.assign(_IconTwitter, {
  install(app: App) {
    app.component(_IconTwitter.name, _IconTwitter)
  },
})
