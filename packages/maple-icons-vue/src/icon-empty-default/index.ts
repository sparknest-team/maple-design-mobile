import type { App } from 'vue'
import _IconEmptyDefault from './icon-empty-default.vue'

export const IconEmptyDefault = Object.assign(_IconEmptyDefault, {
  install(app: App) {
    app.component(_IconEmptyDefault.name, _IconEmptyDefault)
  },
})
