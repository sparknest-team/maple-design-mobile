import { createApp } from 'vue'
import { Breadcrumb, Button, Carousel, Checkbox, Form, Input, Menu, Radio, Tabs } from '@maple-design/ui-vue'
import BreadcrumbEntry from '@maple-design/ui-vue/breadcrumb'
import CheckboxEntry from '@maple-design/ui-vue/checkbox'
import MenuEntry from '@maple-design/ui-vue/menu'
import RadioEntry from '@maple-design/ui-vue/radio'

const app = createApp({})
for (const component of [Breadcrumb, Checkbox, Menu, Radio, BreadcrumbEntry, CheckboxEntry, MenuEntry, RadioEntry]) {
  app.use(component)
}

Button.setPropsDefaults({})
Input.setPropsDefaults({})
Tabs.setPropsDefaults({})
void [Input.Password, Input.Group, Input.GroupLabel, Carousel.Item, Checkbox.Group, Menu.Option, Radio.Group]
void [Tabs.TabPane, Tabs.TabNav, Tabs.TabsNavs, Tabs.TabItem, Tabs.TabsItems, Form.Item, Form.useForm]
declare const input: InstanceType<typeof Input>
input.focus()
input.blur()
