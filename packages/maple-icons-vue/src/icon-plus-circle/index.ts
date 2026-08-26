import type { App } from 'vue'
import _IconPlusCircle from './icon-plus-circle.vue'

export const IconPlusCircle = Object.assign(_IconPlusCircle, {
  install(app: App) {
    app.component(_IconPlusCircle.name, _IconPlusCircle)
  },
})
