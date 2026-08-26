import type { App } from 'vue'
import _IconPlusCircleOutline from './icon-plus-circle-outline.vue'

export const IconPlusCircleOutline = Object.assign(_IconPlusCircleOutline, {
  install(app: App) {
    app.component(_IconPlusCircleOutline.name, _IconPlusCircleOutline)
  },
})
