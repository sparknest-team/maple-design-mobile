import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Switch from '..'

test('beforeChange waits for done, ignores double completion, and invalidates delayed callbacks', async () => {
  let finish!: (allowed?: boolean) => void
  const owner = mount(Switch, {
    props: {
      editMode: 'direct',
      beforeChange: (_value, done) => {
        finish = done
      },
    },
  })
  try {
    await owner.trigger('click')
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    finish()
    finish(false)
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toEqual([[true]])
    await owner.trigger('click')
    await owner.setProps({ disabled: true })
    finish()
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toEqual([[true]])
  } finally {
    owner.unmount()
  }
})
