import type { App } from 'vue'
import _IconMuteFill from './icon-mute-fill.vue'

export const IconMuteFill = Object.assign(_IconMuteFill, {
  install(app: App) { app.component(_IconMuteFill.name, _IconMuteFill) },
})
