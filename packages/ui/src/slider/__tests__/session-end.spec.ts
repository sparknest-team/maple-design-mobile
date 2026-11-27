import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Slider from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
function pointer(target: EventTarget, type: string, x = 20, id = 1) {
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: 0,
      button: 0,
      buttons: type === 'pointerdown' || type === 'pointermove' ? 1 : 0,
      pointerId: id,
      isPrimary: true,
      pointerType: 'mouse',
    }),
  )
}
function geometry(owner: ReturnType<typeof mount>) {
  const track = owner.get('[class*="slider__track"]').element
  track.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 100,
    bottom: 100,
    width: 100,
    height: 100,
    toJSON: () => ({}),
  })
  return track
}
async function fixture(extra = {}) {
  const owner = mount(Slider, { props: { editMode: 'direct', defaultValue: 20, ...extra } })
  owners.push(owner)
  geometry(owner)
  const thumb = owner.get('[role="slider"]').element
  pointer(thumb, 'pointerdown')
  pointer(document, 'pointermove', 70)
  await nextTick()
  return { owner, thumb }
}
for (const state of ['disabled', 'readonly']) {
  test(`${state} cancels with one end carrying the last proposal even when the controlled parent refused it`, async () => {
    const { owner } = await fixture({ modelValue: 20 })
    expect(owner.emitted('start')).toEqual([[]])
    expect(owner.emitted('change')).toEqual([[70]])
    await owner.setProps({ [state]: true })
    expect(owner.emitted('end')).toEqual([[70]])
    pointer(document, 'pointerup', 90)
    pointer(document, 'pointermove', 80)
    await nextTick()
    expect(owner.emitted('end')).toEqual([[70]])
    expect(owner.emitted('update:modelValue')).toEqual([[70]])
    expect(owner.get('[role="slider"]').attributes('aria-valuenow')).toBe('20')
  })
}
for (const change of [{ range: true }, { orientation: 'vertical' }, { min: 25 }, { max: 50 }, { step: 5 }] as const) {
  test(`configuration ${JSON.stringify(change)} ends the old gesture without a new model proposal`, async () => {
    const { owner } = await fixture()
    await owner.setProps(change)
    expect(owner.emitted('end')).toEqual([[70]])
    pointer(document, 'pointerup', 90)
    await nextTick()
    expect(owner.emitted('end')).toHaveLength(1)
    expect(owner.emitted('update:modelValue')).toEqual([[70]])
  })
}
test('ending a range because its mode changed preserves the original range payload shape', async () => {
  const model = Object.freeze([20, 40]),
    owner = mount(Slider, { props: { editMode: 'direct', range: true, modelValue: model as any } })
  owners.push(owner)
  geometry(owner)
  pointer(owner.findAll('[role="slider"]')[1].element, 'pointerdown', 40)
  pointer(document, 'pointermove', 70)
  await nextTick()
  await owner.setProps({ range: false })
  expect(owner.emitted('end')).toEqual([[[20, 70]]])
  expect(model).toEqual([20, 40])
})
test('a canceled gesture with no move reports its original value rather than newly clamped bounds', async () => {
  const owner = mount(Slider, { props: { editMode: 'direct', defaultValue: 20 } })
  owners.push(owner)
  geometry(owner)
  pointer(owner.get('[role="slider"]').element, 'pointerdown')
  await nextTick()
  await owner.setProps({ min: 25 })
  expect(owner.emitted('end')).toEqual([[20]])
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})
test('KeepAlive cancellation is balanced and old pointer events cannot extend it', async () => {
  const visible = ref(true),
    starts: unknown[] = [],
    ends: unknown[] = []
  const owner = mount({
    render: () =>
      h(KeepAlive, null, () =>
        visible.value
          ? h(Slider, {
              editMode: 'direct',
              defaultValue: 20,
              onStart: () => starts.push('start'),
              onEnd: (value) => ends.push(value),
            })
          : h('span'),
      ),
  })
  owners.push(owner)
  geometry(owner)
  pointer(owner.get('[role="slider"]').element, 'pointerdown')
  pointer(document, 'pointermove', 70)
  await nextTick()
  visible.value = false
  await nextTick()
  expect(ends).toEqual([70])
  pointer(document, 'pointermove', 90)
  pointer(document, 'pointerup', 90)
  await nextTick()
  expect(ends).toEqual([70])
  visible.value = true
  await nextTick()
  geometry(owner)
  pointer(owner.get('[role="slider"]').element, 'pointerdown', 70)
  pointer(document, 'pointerup', 80)
  await nextTick()
  expect(starts).toHaveLength(2)
  expect(ends).toEqual([70, 80])
})
test('unmount finishes an active session once and removes pointer listeners', async () => {
  const ends: unknown[][] = []
  const { owner } = await fixture({ onEnd: (...args: unknown[]) => ends.push(args) })
  owner.unmount()
  owners.splice(owners.indexOf(owner), 1)
  expect(ends).toEqual([[70]])
  pointer(document, 'pointermove', 90)
  pointer(document, 'pointerup', 90)
  expect(ends).toEqual([[70]])
})
test('cleanup without a start never manufactures an end event', async () => {
  const owner = mount(Slider, { props: { editMode: 'direct' } })
  owners.push(owner)
  await owner.setProps({ disabled: true })
  await owner.setProps({ range: true })
  owner.unmount()
  owners.splice(owners.indexOf(owner), 1)
  expect(owner.emitted('start')).toBeUndefined()
  expect(owner.emitted('end')).toBeUndefined()
})

test('capture release is safe when capture is already lost or releases synchronously', async () => {
  const { owner, thumb } = await fixture()
  const capture = thumb as HTMLElement
  capture.hasPointerCapture = () => true
  capture.releasePointerCapture = () => {
    pointer(capture, 'lostpointercapture', 70)
    throw new DOMException('Already released', 'NotFoundError')
  }
  pointer(document, 'pointerup', 70)
  await nextTick()
  expect(owner.emitted('end')).toEqual([[70]])
})
test('an owner-window blur ends the session once', async () => {
  const { owner } = await fixture()
  window.dispatchEvent(new Event('blur'))
  await nextTick()
  expect(owner.emitted('end')).toEqual([[70]])
  pointer(document, 'pointerup', 90)
  expect(owner.emitted('end')).toEqual([[70]])
})
test('a start listener that unmounts the slider cannot receive a late track proposal', async () => {
  const starts: unknown[] = [],
    ends: unknown[] = [],
    proposals: unknown[] = []
  const owner = mount(Slider, {
    props: {
      editMode: 'direct',
      defaultValue: 20,
      onStart: () => {
        starts.push('start')
        owner.unmount()
        owners.splice(owners.indexOf(owner), 1)
      },
      onEnd: (value: unknown) => ends.push(value),
      'onUpdate:modelValue': (value: unknown) => proposals.push(value),
    },
  })
  owners.push(owner)
  const track = geometry(owner)
  pointer(track, 'pointerdown', 70)
  await nextTick()
  expect(starts).toHaveLength(1)
  expect(ends).toEqual([20])
  expect(proposals).toEqual([])
})
