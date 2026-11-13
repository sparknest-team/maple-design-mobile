import { createSSRApp, defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Upload from '..'

const owners = []
const file = {
  uid: 'image',
  name: 'image.svg',
  type: 'image/svg+xml',
  url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',
  status: 'success',
  percent: 100,
}
const render = (props = {}, slots = {}) => {
  const wrapper = mount(Upload, { attachTo: document.body, props: { defaultValue: [file], ...props }, slots })
  owners.push(wrapper)
  return wrapper
}
const sections = (wrapper) =>
  Array.from(wrapper.get('.mp-upload__content').element.children)
    .filter((node) => node.matches('.mp-upload__trigger,.mp-upload__list'))
    .map((node) => (node.classList.contains('mp-upload__trigger') ? 'trigger' : 'list'))
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
})

for (const listType of ['text', 'picture', 'picture-card']) {
  test(`${listType}: DOM order changes without replacing input, trigger or file nodes`, async () => {
    const request = vi.fn()
    const wrapper = render({ listType, customRequest: request })
    const input = wrapper.get('input[type=file]').element
    const trigger = wrapper.get('.mp-upload__trigger').element
    const list = wrapper.get('.mp-upload__list').element
    const item = wrapper.get('.mp-upload__item').element
    expect(sections(wrapper)).toEqual(['list', 'trigger'])
    for (const position of ['after', 'before', 'after']) {
      await wrapper.setProps({ triggerPosition: position })
      expect(sections(wrapper)).toEqual(position === 'after' ? ['list', 'trigger'] : ['trigger', 'list'])
      expect(wrapper.get('input[type=file]').element).toBe(input)
      expect(wrapper.get('.mp-upload__trigger').element).toBe(trigger)
      expect(wrapper.get('.mp-upload__list').element).toBe(list)
      expect(wrapper.get('.mp-upload__item').element).toBe(item)
      expect(wrapper.vm.getFiles().map((item) => item.uid)).toEqual(['image'])
    }
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(request).not.toHaveBeenCalled()
  })
}

test('custom draggable trigger preserves its component state and chooser behavior', async () => {
  const mounted = vi.fn(),
    unmounted = vi.fn()
  const Child = defineComponent({
    setup() {
      const count = ref(0)
      onMounted(mounted)
      onUnmounted(unmounted)
      return () =>
        h(
          'button',
          {
            type: 'button',
            onClick: (event) => {
              event.stopPropagation()
              count.value++
            },
          },
          String(count.value),
        )
    },
  })
  const wrapper = render({ draggable: true }, { trigger: () => h(Child) })
  const button = wrapper.get('.mp-upload__trigger button').element
  await wrapper.get('.mp-upload__trigger button').trigger('click')
  await wrapper.setProps({ triggerPosition: 'after' })
  await wrapper.setProps({ triggerPosition: 'before' })
  expect(wrapper.get('.mp-upload__trigger button').element).toBe(button)
  expect(button.textContent).toBe('1')
  expect(mounted).toHaveBeenCalledTimes(1)
  expect(unmounted).not.toHaveBeenCalled()
  expect(wrapper.get('.mp-upload__trigger').classes()).toContain('mp-upload__trigger--draggable')
})

test('the default trigger after the list still supports keyboard selection', async () => {
  const wrapper = render({ triggerPosition: 'after' })
  const choose = vi.spyOn(wrapper.get('input[type=file]').element, 'click').mockImplementation(() => {})
  await wrapper.get('.mp-upload__trigger').trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(choose).toHaveBeenCalledTimes(1)
})

test('visibility and maximum count remain effective after reordering', async () => {
  const wrapper = render({ triggerPosition: 'after', showFileList: false })
  expect(sections(wrapper)).toEqual(['trigger'])
  await wrapper.setProps({ showFileList: true, showUploadButton: false })
  expect(sections(wrapper)).toEqual(['list'])
  await wrapper.setProps({ showUploadButton: true, maxFiles: 1 })
  expect(sections(wrapper)).toEqual(['list'])
  await wrapper.setProps({ maxFiles: 2 })
  expect(sections(wrapper)).toEqual(['list', 'trigger'])
  expect(wrapper.findAll('input[type=file]')).toHaveLength(1)
})

for (const restriction of ['disabled', 'readonly']) {
  test(`${restriction} still prevents choosing files with an after trigger`, async () => {
    const wrapper = render({ triggerPosition: 'after', [restriction]: true })
    const choose = vi.spyOn(wrapper.get('input[type=file]').element, 'click').mockImplementation(() => {})
    await wrapper.get('.mp-upload__trigger').trigger('click')
    await flushPromises()
    expect(choose).not.toHaveBeenCalled()
  })
}

test('SSR places the trigger in the configured DOM order', async () => {
  for (const triggerPosition of [undefined, 'before', 'after']) {
    const html = await renderToString(
      createSSRApp({ render: () => h(Upload, { defaultValue: [file], triggerPosition }) }),
    )
    const trigger = html.indexOf('class="mp-upload__trigger')
    const list = html.indexOf('class="mp-upload__list')
    expect(trigger).toBeGreaterThan(-1)
    expect(list).toBeGreaterThan(-1)
    expect(trigger < list).toBe(triggerPosition === 'before')
  }
})
