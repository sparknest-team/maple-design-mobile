import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import List, { ListItem } from '..'
import Button from '../../button'
import Space from '../../space'
import Bounded from '../example/demos/bounded-scroll.vue'
import Navigation from '../example/demos/virtual-navigation.vue'

for (const [name, demo] of [
  ['navigation', Navigation],
  ['bounded', Bounded],
]) {
  test(name + ' stacks controls above a full-width list', () => {
    const owner = mount(demo, {
      global: {
        components: { MpSpace: Space, MpButton: Button, MpList: List, MpListItem: ListItem },
      },
    })
    expect(owner.findComponent(Space).props('direction')).toBe('column')
    expect(owner.findComponent(List).exists()).toBe(true)
    owner.unmount()
  })
}
