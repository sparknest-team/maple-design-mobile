import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCakeVariant from './icon-cake-variant.vue'

export const IconCakeVariant: IconComponent = Object.assign(_IconCakeVariant, {
  install(app: App) { app.component(_IconCakeVariant.name, _IconCakeVariant) },
})
