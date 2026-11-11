import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Search from '..'
import Input from '../../input'

const owners = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
test.each(['outline', 'filled', 'standard'])(
  'renders the real Input variant %s inside the shared borderless search shell',
  async (variant) => {
    const wrapper = mount(Search, { props: { variant, size: 'xl', editMode: 'direct' } })
    owners.push(wrapper)
    expect(wrapper.find('.mp-input .mp-field-decorator--variant-' + variant).exists()).toBe(true)
    const child = wrapper.findComponent(Input)
    expect(child.props('line')).toBe(false)
    expect(child.props('size')).toBe('xl')
  },
)
