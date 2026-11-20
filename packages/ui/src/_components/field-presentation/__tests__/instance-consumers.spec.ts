import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import AutoComplete from '../../../auto-complete'
import Cascader from '../../../cascader'
import Checkbox from '../../../checkbox'
import DateField from '../../../date'
import DateRange from '../../../date-range'
import InputNumber from '../../../input-number'
import Radio from '../../../radio'
import Rate from '../../../rate'
import Slider from '../../../slider'
import Textarea from '../../../textarea'
import Time from '../../../time'
import TimeRange from '../../../time-range'
import VerificationCode from '../../../verification-code'
import { fieldEditModeProp } from '../context'
import EditorPanel from '../EditorPanel.vue'
import FieldPresentation from '../FieldPresentation.vue'

const mode = fieldEditModeProp.validator('click') ? 'click' : 'popup'
const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
for (const [name, component, props] of [
  ['Textarea', Textarea, {}],
  ['InputNumber', InputNumber, {}],
  ['VerificationCode', VerificationCode, {}],
  ['Checkbox', Checkbox, {}],
  ['Radio', Radio, {}],
  ['Slider', Slider, {}],
  ['Rate', Rate, {}],
  ['AutoComplete', AutoComplete, { options: [{ label: 'Alpha', value: 'a' }] }],
  ['Cascader', Cascader, { options: [{ label: 'Alpha', value: 'a' }] }],
  ['Date', DateField, {}],
  ['DateRange', DateRange, {}],
  ['Time', Time, {}],
  ['TimeRange', TimeRange, {}],
] as const) {
  test(`${name} existing focus and blur target its current deferred editor`, async () => {
    const owner = mount(component as any, { props: { editMode: mode, ...props }, attachTo: document.body })
    owners.push(owner)
    const instance = owner.vm as any
    const focus = instance.focus
    expect(focus).toBeTypeOf('function')
    expect(instance.blur).toBeTypeOf('function')
    focus()
    await flushPromises()
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
    const panel = owner.getComponent(EditorPanel).element
    expect(panel.contains(document.activeElement)).toBe(true)
    instance.blur()
    expect(panel.contains(document.activeElement)).toBe(false)
  })
}

test.each(['open', 'closed'] as const)('Cascader blur handles retargeted focus in a %s shadow root', async (shadowMode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: shadowMode })
  const container = document.createElement('div')
  const other = document.createElement('button')
  root.append(container, other)
  const owner = mount(Cascader, {
    props: { editMode: mode, popupContainer: container, options: [{ label: 'Alpha', value: 'a' }] },
    attachTo: document.body,
  })
  try {
    const instance = owner.vm as unknown as { focus(): void; blur(): void }
    instance.focus()
    await flushPromises()
    const panel = owner.getComponent(EditorPanel).element
    expect(panel.getRootNode()).toBe(root)
    expect(panel.contains(root.activeElement)).toBe(true)
    expect(document.activeElement).toBe(host)
    instance.blur()
    expect(panel.contains(root.activeElement)).toBe(false)
    other.focus()
    instance.blur()
    expect(root.activeElement).toBe(other)
  } finally {
    owner.unmount()
    host.remove()
  }
})
