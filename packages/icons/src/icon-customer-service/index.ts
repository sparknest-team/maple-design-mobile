import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCustomerService from './icon-customer-service.vue'

export const IconCustomerService: IconComponent = Object.assign(_IconCustomerService, {
  install(app: App) { app.component(_IconCustomerService.name!, _IconCustomerService) },
})
