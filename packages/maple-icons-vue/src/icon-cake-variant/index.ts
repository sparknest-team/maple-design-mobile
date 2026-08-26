import type { App } from 'vue'
import _IconCakeVariant from './icon-cake-variant.vue'

export const IconCakeVariant = Object.assign(_IconCakeVariant, {
  install(app: App) {
    app.component(_IconCakeVariant.name, _IconCakeVariant)
  },
})
