import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Empty from '..'

describe('empty', () => {
  it('renders its description', () => {
    const wrapper = mount(Empty, { props: { description: 'No data' } })

    expect(wrapper.text()).toContain('No data')
  })

  it('renders custom imageUrl', () => {
    const wrapper = mount(Empty, {
      props: {
        description: 'Custom',
        imageUrl: 'https://cdn.example.com/empty.svg',
      },
    })

    expect(wrapper.find('img').attributes('src')).toBe('https://cdn.example.com/empty.svg')
  })
})
