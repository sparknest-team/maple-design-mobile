import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCodeSandbox from './icon-code-sandbox.vue'

export const IconCodeSandbox: IconComponent = Object.assign(_IconCodeSandbox, {
  install(app: App) { app.component(_IconCodeSandbox.name!, _IconCodeSandbox) },
})
