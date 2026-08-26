import type { App } from 'vue'
import _IconCogOutline from './icon-cog-outline.vue'

export const IconCogOutline = Object.assign(_IconCogOutline, {
  install(app: App) {
    app.component(_IconCogOutline.name, _IconCogOutline)
  },
})
