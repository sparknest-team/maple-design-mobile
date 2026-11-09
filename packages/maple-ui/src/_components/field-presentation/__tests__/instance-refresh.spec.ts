import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import AutoComplete from '../../../auto-complete'
import Cascader from '../../../cascader'
import { fieldEditModeProp } from '../context'
import FieldPresentation from '../FieldPresentation.vue'

const mode = fieldEditModeProp.validator('click') ? 'click' : 'popup'
const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
for (const [name, component] of [
  ['AutoComplete', AutoComplete],
  ['Cascader', Cascader],
] as const) {
  test(`${name} closed public refresh retries a failed source without opening an editor`, async () => {
    let calls = 0
    const signals: AbortSignal[] = []
    const options = async (_query: string, { signal }: { signal: AbortSignal }) => {
      signals.push(signal)
      if (++calls === 1) {
        throw new Error('first request failed')
      }
      return [{ label: 'Retry succeeded', value: 'retry' }]
    }
    const owner = mount(component as any, {
      props: { editMode: mode, options, ...(name === 'AutoComplete' ? { searchDelay: 0 } : {}) },
    })
    owners.push(owner)
    await flushPromises()
    expect(calls).toBe(1)
    expect(owner.emitted('load-error')).toHaveLength(1)
    const refresh = (owner.vm as any).refresh
    expect(refresh).toBeTypeOf('function')
    await refresh()
    await flushPromises()
    expect(calls).toBe(2)
    expect(signals.every((signal) => typeof signal.aborted === 'boolean')).toBe(true)
    expect(owner.emitted('load-error')).toHaveLength(1)
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
    expect((owner.vm as any).refresh).toBe(refresh)
  })
}
