import type { App } from 'vue'
import _IconCommon from './icon-common.vue'

export const IconCommon = Object.assign(_IconCommon, {
  install(app: App) {
    app.component(_IconCommon.name, _IconCommon)
  },
})
