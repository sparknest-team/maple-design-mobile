import { h } from 'vue'
import { Message } from '../src'
import type { MessageContent, MessageInstance } from '../src'
import type { MessageContent as EntryContent } from '../src/message'

const values: MessageContent[] = [
  false,
  null,
  undefined,
  0,
  '',
  h('span'),
  [h('span'), 'text', false],
  () => h('button', 'Action'),
]
const entry: EntryContent = values[0]
type ComponentProps = InstanceType<typeof Message.Component>['$props']
const validProps: ComponentProps = { status: 'info' }
const component = new Message.Component()
const instance: MessageInstance = component
instance.restartTimer()
// @ts-expect-error arbitrary objects are not Vue renderable content
const invalid: MessageContent = { arbitrary: true }
// @ts-expect-error render functions must return Vue content
const invalidRender: MessageContent = () => ({ arbitrary: true })
// @ts-expect-error async business tasks are not content render functions
const invalidAsync: MessageContent = async () => 'done'
// @ts-expect-error the real component retains its status prop type
const invalidComponent: ComponentProps = { status: 'unknown' }
void [validProps, values, entry, invalid, invalidRender, invalidAsync, invalidComponent]
