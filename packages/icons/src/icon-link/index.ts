import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLink from './icon-link.vue'

export const IconLink: IconComponent = Object.assign(_IconLink, {
  install(app: App) { app.component(_IconLink.name!, _IconLink) },
})
