import { createApp, h, KeepAlive, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Slider from '..'
import { sliderBounds, sliderValues, snap } from '../model'

function rect(wrapper) {
  wrapper.get('.mp-slider__track').element.getBoundingClientRect = () => ({
    left: 0,
    right: 100,
    top: 0,
    bottom: 100,
    width: 100,
    height: 100,
  })
}
async function pointer(target, type, x = 0, y = 0, extra = {}) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y })
  Object.defineProperties(event, {
    pointerId: { value: extra.pointerId ?? 1 },
    isPrimary: { value: true },
    pointerType: { value: extra.pointerType ?? 'mouse' },
  })
  target.dispatchEvent(event)
  await nextTick()
  return event
}
const value = (wrapper) => Number(wrapper.get('[role="slider"]').attributes('aria-valuenow'))

describe('Slider', () => {
  test('installs, snapshots and SSR', async () => {
    expect(createApp({}).use(Slider).component(Slider.name)).toBeTruthy()
    const wrapper = mount(Slider, { props: { editMode: 'direct' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(value(wrapper)).toBe(0)
    wrapper.unmount()
    const render = () =>
      renderToString(
        createApp({
          render: () => h(Slider, { editMode: 'direct', defaultValue: [10, 50], range: true, showTooltip: 'always' }),
        }),
      )
    expect(await render()).toBe(await render())
  })
  test('normalizes finite bounds, decimal steps, off-grid max and reversed range', () => {
    expect(sliderBounds(NaN, Infinity, -1)).toEqual({ min: 0, max: 100, step: 1 })
    expect(snap(0.3, sliderBounds(0.1, 1, 0.1))).toBe(0.3)
    expect(snap(1, sliderBounds(0, 1, 0.3))).toBe(1)
    expect(sliderValues([80, 20], true, sliderBounds(0, 100, 1))).toEqual([20, 80])
    expect(sliderValues([Infinity, NaN], true, sliderBounds(0, 100, 1))).toEqual([0, 0])
  })
  test('uncontrolled local keyboard, page keys and endpoints', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', defaultValue: 20, step: 2, ariaLabel: 'Volume' } })
    const thumb = wrapper.get('[role="slider"]')
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(value(wrapper)).toBe(22)
    await thumb.trigger('keydown', { key: 'PageUp' })
    expect(value(wrapper)).toBe(42)
    await thumb.trigger('keydown', { key: 'End' })
    expect(value(wrapper)).toBe(100)
    await thumb.trigger('keydown', { key: 'Home' })
    expect(value(wrapper)).toBe(0)
    expect(thumb.attributes('aria-label')).toBe('Volume')
    expect(wrapper.emitted('change')).toHaveLength(4)
    expect(wrapper.emitted('start')).toHaveLength(4)
    expect(wrapper.emitted('end')).toHaveLength(4)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    expect(value(wrapper)).toBe(0)
    await thumb.trigger('keydown', { key: 'ArrowRight', ctrlKey: true })
    expect(value(wrapper)).toBe(0)
    wrapper.unmount()
  })
  test('keyboard leaves an off-grid maximum at the closest previous step', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', min: 0, max: 1, step: 0.3, defaultValue: 1 } })
    await wrapper.get('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(value(wrapper)).toBe(0.9)
    wrapper.unmount()
  })
  test('controlled rejection never mutates displayed value', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', modelValue: 20 } })
    await wrapper.get('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[21]])
    expect(value(wrapper)).toBe(20)
    await wrapper.setProps({ modelValue: 35 })
    expect(value(wrapper)).toBe(35)
    wrapper.unmount()
  })
  test('controlled acceptance, range bounds and no crossing', async () => {
    const pair = ref([20, 40])
    const wrapper = mount({
      render: () =>
        h(Slider, {
          editMode: 'direct',
          range: true,
          modelValue: pair.value,
          'onUpdate:modelValue': (next) => (pair.value = next),
        }),
    })
    const [low, high] = wrapper.findAll('[role="slider"]')
    await low.trigger('keydown', { key: 'End' })
    expect(pair.value).toEqual([40, 40])
    expect(high.attributes('aria-valuemin')).toBe('40')
    await high.trigger('keydown', { key: 'ArrowLeft' })
    expect(pair.value).toEqual([40, 40])
    await low.trigger('keydown', { key: 'ArrowLeft' })
    expect(pair.value).toEqual([39, 40])
    wrapper.unmount()
  })
  test.each(['mouse', 'touch', 'pen'])(
    '%s pointer drag emits once, ignores other pointer and releases capture',
    async (pointerType) => {
      const wrapper = mount(Slider, { props: { editMode: 'direct', defaultValue: 20 } })
      rect(wrapper)
      const thumb = wrapper.get('[role="slider"]').element
      thumb.setPointerCapture = vi.fn()
      thumb.hasPointerCapture = () => true
      thumb.releasePointerCapture = vi.fn()
      await pointer(thumb, 'pointerdown', 20, 0, { pointerType })
      await pointer(document, 'pointermove', 40, 0, { pointerId: 2, pointerType })
      expect(value(wrapper)).toBe(20)
      await pointer(document, 'pointermove', 40, 0, { pointerType })
      await pointer(document, 'pointermove', 40, 0, { pointerType })
      await pointer(document, 'pointerup', 40, 0, { pointerType })
      expect(wrapper.emitted('start')).toEqual([[]])
      expect(wrapper.emitted('change')).toEqual([[40]])
      expect(wrapper.emitted('end')).toEqual([[40]])
      expect(thumb.releasePointerCapture).toHaveBeenCalledTimes(1)
      await pointer(document, 'pointermove', 80)
      expect(value(wrapper)).toBe(40)
      wrapper.unmount()
    },
  )
  test('track chooses closest and separates overlapping thumbs at max', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', range: true, defaultValue: [100, 100] } })
    rect(wrapper)
    await pointer(wrapper.get('.mp-slider__track').element, 'pointerdown', 80)
    await pointer(document, 'pointerup', 80)
    expect(wrapper.findAll('[role="slider"]').map((node) => node.attributes('aria-valuenow'))).toEqual(['80', '100'])
    wrapper.unmount()
  })
  test('vertical geometry and zero-size track are safe', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', orientation: 'vertical' } })
    rect(wrapper)
    await pointer(wrapper.get('.mp-slider__track').element, 'pointerdown', 0, 25)
    await pointer(document, 'pointerup', 0, 25)
    expect(value(wrapper)).toBe(75)
    expect(wrapper.get('[role="slider"]').attributes('aria-orientation')).toBe('vertical')
    wrapper.get('.mp-slider__track').element.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    })
    await pointer(wrapper.get('.mp-slider__track').element, 'pointerdown', 0, 80)
    expect(value(wrapper)).toBe(75)
    wrapper.unmount()
  })
  test.each(['disabled', 'readonly'])('%s blocks pointer, keyboard and input', async (state) => {
    const wrapper = mount(Slider, {
      props: { editMode: 'direct', [state]: true, showInput: true, defaultValue: 20 },
    })
    rect(wrapper)
    await wrapper.get('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    await pointer(wrapper.get('.mp-slider__track').element, 'pointerdown', 80)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(value(wrapper)).toBe(20)
    if (state === 'readonly') {
      expect(wrapper.get('[role="slider"]').attributes('tabindex')).toBe('0')
    } else {
      expect(wrapper.get('[role="slider"]').attributes('tabindex')).toBeUndefined()
    }
    wrapper.unmount()
  })
  test('pointer cancel, disable mid-drag and unmount remove listeners', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct' } })
    rect(wrapper)
    await pointer(wrapper.get('[role="slider"]').element, 'pointerdown')
    await pointer(document, 'pointercancel', 30)
    expect(wrapper.emitted('end')).toHaveLength(1)
    await pointer(wrapper.get('[role="slider"]').element, 'pointerdown')
    await wrapper.setProps({ disabled: true })
    await pointer(document, 'pointermove', 70)
    expect(value(wrapper)).toBe(0)
    await wrapper.setProps({ disabled: false })
    await pointer(wrapper.get('[role="slider"]').element, 'pointerdown')
    wrapper.unmount()
    await pointer(document, 'pointermove', 90)
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  test('KeepAlive deactivation cancels drag', async () => {
    const shown = ref(true)
    const wrapper = mount({
      render: () => h(KeepAlive, null, { default: () => (shown.value ? h(Slider, { editMode: 'direct' }) : null) }),
    })
    rect(wrapper)
    const slider = wrapper.findComponent(Slider)
    await pointer(wrapper.get('[role="slider"]').element, 'pointerdown')
    shown.value = false
    await nextTick()
    await pointer(document, 'pointermove', 90)
    expect(slider.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
  test('marks, ticks, formatting and custom button slot', async () => {
    const wrapper = mount(Slider, {
      props: {
        editMode: 'direct',
        defaultValue: 25,
        step: 25,
        showTicks: true,
        marks: { 0: 'Low', 100: 'High', 200: 'Hidden' },
        formatTooltip: (value) => value + ' units',
        showTooltip: 'always',
      },
      slots: { button: ({ currentValue }) => h('span', { class: 'custom' }, currentValue) },
    })
    expect(wrapper.findAll('.mp-slider__tick')).toHaveLength(5)
    expect(wrapper.findAll('.mp-slider__mark')).toHaveLength(2)
    expect(wrapper.get('.custom').text()).toBe('25')
    expect(wrapper.get('[role="tooltip"]').text()).toBe('25 units')
    expect(wrapper.get('[role="slider"]').attributes('aria-valuetext')).toBe('25 units')
    await wrapper.setProps({ showTooltip: false, step: 0.001 })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    expect(wrapper.findAll('.mp-slider__tick')).toHaveLength(0)
    wrapper.unmount()
  })

  test('pointerup commits its final coordinate without a move event', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', defaultValue: 20 } })
    rect(wrapper)
    await pointer(wrapper.get('[role="slider"]').element, 'pointerdown', 20)
    await pointer(document, 'pointerup', 65)
    expect(value(wrapper)).toBe(65)
    expect(wrapper.emitted('end')).toEqual([[65]])
    wrapper.unmount()
  })
  test('invalid geometry leaves theme token defaults intact', () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', thumbSize: -1, trackHeight: 'bad' } })
    expect(wrapper.attributes('style') ?? '').not.toContain('thumb-size')
    expect(wrapper.attributes('style') ?? '').not.toContain('track-height')
    wrapper.unmount()
  })
  test('lost capture closes the drag and controlled rejection remains stable', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', modelValue: 20 } })
    rect(wrapper)
    const thumb = wrapper.get('[role="slider"]').element
    await pointer(thumb, 'pointerdown', 20)
    await pointer(document, 'pointermove', 70)
    expect(value(wrapper)).toBe(20)
    await pointer(thumb, 'lostpointercapture', 70)
    expect(wrapper.emitted('end')).toEqual([[70]])
    await pointer(document, 'pointermove', 90)
    expect(wrapper.emitted('change')).toEqual([[70]])
    wrapper.unmount()
  })
  test('InputNumber normalizes input through the same range model', async () => {
    const wrapper = mount(Slider, { props: { editMode: 'direct', showInput: true, defaultValue: 20, step: 5 } })
    const input = wrapper.get('input')
    await input.setValue('42')
    await input.trigger('keydown', { key: 'Enter' })
    expect(value(wrapper)).toBe(40)
    expect(wrapper.emitted('change')).toEqual([[40]])
    wrapper.unmount()
  })
})
