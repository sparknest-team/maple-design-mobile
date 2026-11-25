import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Subject from '../Section.vue'

it('omits an absent body and distinguishes conditional children from empty text', async () => {
  const selector = '.mp-section__content'
  const empty = mount(Subject)
  expect(empty.find(selector).exists()).toBe(false)
  empty.unmount()

  const wrapper = mount(
    {
      components: { Subject },
      props: ['items', 'note'],
      template: `<Subject>
      <template v-for="item in items" :key="item"><span v-if="item">{{ item }}</span></template>
      <template v-if="note !== null">{{ note }}</template>
    </Subject>`,
    },
    { props: { items: [0], note: null } },
  )
  expect(wrapper.find(selector).exists()).toBe(false)
  await wrapper.setProps({ note: '' })
  expect(wrapper.get(selector).text()).toBe('')
  await wrapper.setProps({ items: [1], note: null })
  expect(wrapper.get(selector).text()).toBe('1')
  await wrapper.setProps({ items: [] })
  expect(wrapper.find(selector).exists()).toBe(false)
  wrapper.unmount()
})
