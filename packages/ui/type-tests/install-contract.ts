import { createApp } from 'vue'
import { Breadcrumb, Checkbox, Menu, Radio } from '@maple-design/ui-vue'
import BreadcrumbEntry from '@maple-design/ui-vue/breadcrumb'
import CheckboxEntry from '@maple-design/ui-vue/checkbox'
import MenuEntry from '@maple-design/ui-vue/menu'
import RadioEntry from '@maple-design/ui-vue/radio'

const app = createApp({})
for (const component of [Breadcrumb, Checkbox, Menu, Radio, BreadcrumbEntry, CheckboxEntry, MenuEntry, RadioEntry]) {
  app.use(component)
}
