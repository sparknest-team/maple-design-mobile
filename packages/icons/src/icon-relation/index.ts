import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRelation from './icon-relation.vue'

export const IconRelation: IconComponent = Object.assign(_IconRelation, {
  install(app: App) { app.component(_IconRelation.name, _IconRelation) },
})
