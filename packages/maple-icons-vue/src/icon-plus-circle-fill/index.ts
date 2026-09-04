import type { App } from 'vue'
import _IconPlusCircleFill from './icon-plus-circle-fill.vue'

export const IconPlusCircleFill = Object.assign(_IconPlusCircleFill, {
  install(app: App) {
    app.component(_IconPlusCircleFill.name, _IconPlusCircleFill)
  },
})
