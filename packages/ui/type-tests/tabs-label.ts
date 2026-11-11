import type { TabsProps } from '@maple-design/ui-vue'

const props: TabsProps = { tabListAriaLabel: 'Settings' }
// @ts-expect-error The tab list name is text.
const bad: TabsProps = { tabListAriaLabel: 123 }
void [props, bad]
