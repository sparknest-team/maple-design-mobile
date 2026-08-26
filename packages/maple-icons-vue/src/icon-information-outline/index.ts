import type { App } from 'vue'
import _IconInformationOutline from './icon-information-outline.vue'

export const IconInformationOutline = Object.assign(_IconInformationOutline, {
  install(app: App) {
    app.component(_IconInformationOutline.name, _IconInformationOutline)
  },
})
