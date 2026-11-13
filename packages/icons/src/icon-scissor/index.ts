import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconScissor from './icon-scissor.vue'

export const IconScissor: IconComponent = Object.assign(_IconScissor, {
  install(app: App) { app.component(_IconScissor.name, _IconScissor) },
})
