import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEmptyDefault from './icon-empty-default.vue'

export const IconEmptyDefault: IconComponent = Object.assign(_IconEmptyDefault, {
  install(app: App) { app.component(_IconEmptyDefault.name!, _IconEmptyDefault) },
})
