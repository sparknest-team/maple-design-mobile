import { h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Rate from '../../rate'
import FormItem from '../FormItem.vue'

describe('Rate explicit FormItem label', () => {
  it('does not guess a label target for a mixed field or an overridden role', () => {
    const untargeted = mount(FormItem, {
      props: { label: 'Mixed' },
      slots: { default: () => [h(Rate, { id: 'rating' }), h('input')] },
    })
    const overridden = mount(FormItem, {
      props: { label: 'Rating', labelAttrs: { for: 'rating' } },
      slots: { default: () => h(Rate, { id: 'rating', role: 'presentation' }) },
    })
    try {
      expect(untargeted.get('[role="slider"]').attributes('aria-labelledby')).toBeUndefined()
      expect(overridden.get('[role="presentation"]').attributes('aria-labelledby')).toBeUndefined()
    } finally {
      untargeted.unmount()
      overridden.unmount()
    }
  })
  it('only associates a matching target and respects explicit names', async () => {
    const id = ref('rating')
    const labelFor = ref('rating')
    const name = ref<string | undefined>()
    const namedBy = ref<string | undefined>()
    const wrapper = mount({
      setup: () => () =>
        h(FormItem, { label: 'Rating', labelAttrs: { id: 'rating-label', for: labelFor.value } }, () =>
          h(Rate, { id: id.value, ariaLabel: name.value, 'aria-labelledby': namedBy.value }),
        ),
    })
    try {
      const slider = () => wrapper.get('[role="slider"]')
      expect(slider().attributes('aria-labelledby')).toBe('rating-label')
      labelFor.value = 'other'
      await wrapper.vm.$nextTick()
      expect(slider().attributes('aria-labelledby')).toBeUndefined()
      id.value = 'other'
      await wrapper.vm.$nextTick()
      expect(slider().attributes('aria-labelledby')).toBe('rating-label')
      name.value = 'Score'
      await wrapper.vm.$nextTick()
      expect(slider().attributes('aria-labelledby')).toBeUndefined()
      expect(slider().attributes('aria-label')).toBe('Score')
      name.value = undefined
      namedBy.value = 'external'
      await wrapper.vm.$nextTick()
      expect(slider().attributes('aria-labelledby')).toBe('external')
    } finally {
      wrapper.unmount()
    }
  })
})
