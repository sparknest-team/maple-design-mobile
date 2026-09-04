import type { App } from 'vue'
import _IconStrikethrough from './icon-strikethrough.vue'

export const IconStrikethrough = Object.assign(_IconStrikethrough, {
  install(app: App) {
    app.component(_IconStrikethrough.name, _IconStrikethrough)
  },
})
