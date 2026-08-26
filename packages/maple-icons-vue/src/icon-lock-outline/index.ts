import type { App } from 'vue'
import _IconLockOutline from './icon-lock-outline.vue'

export const IconLockOutline = Object.assign(_IconLockOutline, {
  install(app: App) {
    app.component(_IconLockOutline.name, _IconLockOutline)
  },
})
