import { defineComponent, h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import NavMenu, { NavMenuItem } from '..'

const mounted = []
const settle = async () => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 80))
  await flushPromises()
}
afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

describe('shared NavMenu Item panel contract', () => {
  for (const unmountOnClose of [false, true]) {
    it(`opens lazily and ${unmountOnClose ? 'unmounts' : 'retains'} local drafts after close`, async () => {
      let mounts = 0
      const Draft = defineComponent({
        setup() {
          mounts++
          const draft = ref('')
          return () =>
            h('input', {
              'data-draft': '',
              value: draft.value,
              onInput: (event) => {
                draft.value = event.target.value
              },
            })
        },
      })
      const wrapper = mount(NavMenu, {
        attachTo: document.body,
        props: { mode: 'horizontal', popupContainer: false },
        global: { stubs: { transition: false } },
        slots: { default: () => h(NavMenuItem, { label: 'Draft', unmountOnClose }, { content: () => h(Draft) }) },
      })
      mounted.push(wrapper)
      expect(mounts).toBe(0)
      const entry = wrapper.get('[data-nav-item]')
      await entry.trigger('click')
      await settle()
      await wrapper.get('[data-draft]').setValue('unsaved')
      wrapper.get('[data-draft]').element.focus()
      wrapper.vm.close()
      await settle()
      expect(entry.attributes('aria-expanded')).toBe('false')
      expect(document.activeElement).toBe(entry.element)
      expect(wrapper.find('[data-draft]').exists()).toBe(!unmountOnClose)
      if (!unmountOnClose) {
        expect(wrapper.get('.mp-nav-menu__popup').attributes('inert')).toBe('')
      }
      await entry.trigger('click')
      await settle()
      expect(wrapper.get('[data-draft]').element.value).toBe(unmountOnClose ? '' : 'unsaved')
      expect(mounts).toBe(unmountOnClose ? 2 : 1)
      expect(wrapper.emitted('update:activeItem')).toBeUndefined()
    })
  }
  it('accepts batched name swaps and keeps business selection attached to current names', async () => {
    const names = reactive(['first', 'second'])
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { mode: 'horizontal', popupContainer: false },
      slots: { default: () => names.map((name, index) => h(NavMenuItem, { key: index, name, label: name })) },
    })
    mounted.push(wrapper)
    names.splice(0, 2, 'second', 'first')
    await nextTick()
    await wrapper.findAllComponents(NavMenuItem)[0].get('[data-nav-item]').trigger('click')
    expect(wrapper.emitted('update:activeItem')).toEqual([['second']])
    await wrapper.findAllComponents(NavMenuItem)[1].get('[data-nav-item]').trigger('click')
    expect(wrapper.emitted('update:activeItem')).toEqual([['second'], ['first']])
  })
  it('checks final names when inserting an entry before a renamed entry', async () => {
    const entries = reactive([{ id: 1, name: 'first' }])
    const errors = []
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { mode: 'horizontal', popupContainer: false },
      global: { config: { errorHandler: (error) => errors.push(error) } },
      slots: { default: () => entries.map(({ id, name }) => h(NavMenuItem, { key: id, name, label: name })) },
    })
    mounted.push(wrapper)
    entries[0].name = 'second'
    entries.unshift({ id: 2, name: 'first' })
    await nextTick()
    expect(errors).toHaveLength(0)
    entries[1].name = 'first'
    await nextTick()
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toContain('duplicate name: first')
    entries[1].name = 'third'
    await nextTick()
    await wrapper.findAllComponents(NavMenuItem)[1].get('[data-nav-item]').trigger('click')
    expect(wrapper.emitted('update:activeItem')).toEqual([['third']])
  })
  it('keeps filter-bar keyboard navigation out of retained nested panel entries', async () => {
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { mode: 'horizontal', popupContainer: false },
      slots: {
        default: () => [
          h(
            NavMenuItem,
            { label: 'A', 'data-outer-a': '' },
            {
              content: () =>
                h(
                  NavMenu,
                  { mode: 'horizontal' },
                  {
                    default: () => h(NavMenuItem, { label: 'Nested', 'data-nested': '' }),
                  },
                ),
            },
          ),
          h(NavMenuItem, { label: 'B', 'data-outer-b': '' }),
        ],
      },
    })
    mounted.push(wrapper)
    await wrapper.get('[data-outer-a]').trigger('click')
    await settle()
    wrapper.vm.close()
    await settle()
    expect(wrapper.find('[data-nested]').exists()).toBe(true)
    wrapper.get('[data-outer-b]').element.focus()
    await wrapper.get('[data-outer-b]').trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(wrapper.get('[data-outer-a]').element)
  })
  it('keeps drafts interactive when an unmounting close transition is cancelled', async () => {
    let mounts = 0
    const Draft = defineComponent({
      setup() {
        mounts++
        const draft = ref('')
        return () =>
          h('input', {
            'data-cancelled-draft': '',
            value: draft.value,
            onInput: (event) => {
              draft.value = event.target.value
            },
          })
      },
    })
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { mode: 'horizontal', popupContainer: false },
      global: { stubs: { transition: false } },
      slots: { default: () => h(NavMenuItem, { label: 'Draft', unmountOnClose: true }, { content: () => h(Draft) }) },
    })
    mounted.push(wrapper)
    await wrapper.get('[data-nav-item]').trigger('click')
    await settle()
    await wrapper.get('[data-cancelled-draft]').setValue('unsaved')
    wrapper.vm.close()
    await nextTick()
    await wrapper.get('[data-nav-item]').trigger('click')
    await settle()
    expect(mounts).toBe(1)
    expect(wrapper.get('[data-cancelled-draft]').element.value).toBe('unsaved')
    expect(wrapper.get('.mp-nav-menu__popup').attributes('inert')).toBeUndefined()
  })
  it('root close requests controlled closure without changing selection', async () => {
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { mode: 'horizontal', popupContainer: false, activeItem: 'draft' },
      slots: {
        default: () =>
          h(NavMenuItem, { name: 'draft', open: true, modelValue: 0, options: [{ key: 0, label: 'All' }] }),
      },
    })
    mounted.push(wrapper)
    await settle()
    wrapper.vm.close()
    await settle()
    const item = wrapper.getComponent(NavMenuItem)
    expect(item.emitted('update:open')).toEqual([[false]])
    expect(wrapper.get('[data-nav-item]').attributes('aria-expanded')).toBe('true')
    expect(item.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('update:activeItem')).toBeUndefined()
  })
  it('does not expose an open panel for empty options and responds when options arrive', async () => {
    const wrapper = mount(NavMenuItem, {
      attachTo: document.body,
      props: { popupContainer: false, label: 'Async', open: true, options: [] },
      slots: { label: ({ open }) => `open=${open}` },
    })
    mounted.push(wrapper)
    expect(wrapper.get('[data-nav-item]').text()).toBe('open=false')
    await wrapper.setProps({ options: [{ key: 0, label: 'All' }] })
    await settle()
    expect(wrapper.get('[data-nav-item]').text()).toBe('open=true')
    await wrapper.setProps({ options: [] })
    await settle()
    expect(wrapper.get('[data-nav-item]').text()).toBe('open=false')
  })
  it('hides controlled surfaces during KeepAlive suspension even when closing is rejected', async () => {
    const active = ref(true)
    const wrapper = mount(
      {
        setup: () => () =>
          h(KeepAlive, null, {
            default: () => (active.value ? h(NavMenuItem, { open: true, options: [{ key: 0, label: 'All' }] }) : null),
          }),
      },
      { attachTo: document.body },
    )
    mounted.push(wrapper)
    await settle()
    active.value = false
    await settle()
    expect([...document.querySelectorAll('.mp-nav-menu__popup')].every((panel) => panel.hasAttribute('inert'))).toBe(
      true,
    )
    active.value = true
    await settle()
    expect(wrapper.get('[data-nav-item]').attributes('aria-expanded')).toBe('true')
  })
})
