import type { App } from 'vue'
import _IconCustomerService from './icon-customer-service.vue'

export const IconCustomerService = Object.assign(_IconCustomerService, {
  install(app: App) { app.component(_IconCustomerService.name, _IconCustomerService) },
})
