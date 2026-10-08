import type { App } from 'vue'
import _IconCodeSandbox from './icon-code-sandbox.vue'

export const IconCodeSandbox = Object.assign(_IconCodeSandbox, {
  install(app: App) { app.component(_IconCodeSandbox.name, _IconCodeSandbox) },
})
