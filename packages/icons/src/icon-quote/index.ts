import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQuote from './icon-quote.vue'

export const IconQuote: IconComponent = Object.assign(_IconQuote, {
  install(app: App) { app.component(_IconQuote.name, _IconQuote) },
})
