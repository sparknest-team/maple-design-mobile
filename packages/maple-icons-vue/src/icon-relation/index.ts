import type { App } from 'vue'
import _IconRelation from './icon-relation.vue'

export const IconRelation = Object.assign(_IconRelation, {
  install(app: App) {
    app.component(_IconRelation.name, _IconRelation)
  },
})
