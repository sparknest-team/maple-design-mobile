import type { App } from 'vue'
import _IconFacebookSquareFill from './icon-facebook-square-fill.vue'

export const IconFacebookSquareFill = Object.assign(_IconFacebookSquareFill, {
  install(app: App) {
    app.component(_IconFacebookSquareFill.name, _IconFacebookSquareFill)
  },
})
