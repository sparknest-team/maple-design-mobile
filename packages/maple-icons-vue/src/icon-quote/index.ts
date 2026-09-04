import type { App } from 'vue'
import _IconQuote from './icon-quote.vue'

export const IconQuote = Object.assign(_IconQuote, {
  install(app: App) {
    app.component(_IconQuote.name, _IconQuote)
  },
})
