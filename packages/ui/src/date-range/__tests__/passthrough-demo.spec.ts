import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Host from '..'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/passthrough-options.vue'

test('DateRange typed demo wires real host state and presentation options', async () => {
  const owner = mount(Demo, {
    global: { components: { MpButton: Button, MpSpace: Space, MpDateRange: Host }, stubs: { teleport: true } },
  })
  try {
    const host = owner.findComponent(Host)
    expect(host.props('editMode')).toBe('direct')
    expect(host.props('open')).toBe(false)
    expect(host.props('popupProps')).toMatchObject({ placement: 'top-start' })
    await owner.get('button').trigger('click')
    expect(host.props('open')).toBe(true)
  } finally {
    owner.unmount()
  }
})
