import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Space from '..'

test.each(['xs', 'sm', 'md', 'lg', 'xl'])('preset %s keeps physical gap axes', (size) => {
  for (const direction of ['row', 'column']) {
    const wrapper = mount(Space, { props: { size, direction }, slots: { default: 'content' } })
    expect(wrapper.attributes('style')).toContain(
      `gap: var(--mp-space-size-${size}-row-gap) var(--mp-space-size-${size}-column-gap)`,
    )
    wrapper.unmount()
  }
})
