import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Button from '../../button'
import Space from '../../space'
import config from '../example/demos/api-review.config.json'
import Demo from '../example/demos/icon-animation.vue'
import Icon from '../Icon.vue'

test('the authored name demo switches its icon and registers every review option', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const owner = mount(Demo, { global: { components: { MpIcon: Icon, MpButton: Button, MpSpace: Space } } })
  try {
    const icon = owner.findComponent(Icon)
    const first = icon.get('svg').html()
    await owner.get('button').trigger('click')
    vi.advanceTimersByTime(350)
    await nextTick()
    expect(icon.props('name')).toBe('arrow-right')
    expect(icon.get('svg').html()).not.toBe(first)
    const named = mount(Icon, { global: { components: owner.vm.$.appContext.components } })
    const paths = new Set()
    for (const name of config.fields.find((field) => field.name === 'name').options) {
      await named.setProps({ name })
      vi.advanceTimersByTime(350)
      await nextTick()
      paths.add(named.get('svg').html())
    }
    expect(paths.size).toBe(6)
    named.unmount()
  } finally {
    owner.unmount()
    vi.useRealTimers()
  }
})
