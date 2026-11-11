import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Dialog from '../Dialog.vue'
import { useDialogDrag } from '../use-dialog-drag'

const owners: ReturnType<typeof mount>[] = []
const frames: HTMLIFrameElement[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  frames.splice(0).forEach((frame) => frame.remove())
})
function pointer(target: EventTarget, type: string, x: number, y: number, id = 1, extra = {}) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX: x, clientY: y })
  Object.defineProperties(event, {
    pointerId: { value: id },
    isPrimary: { value: true, configurable: true },
    pointerType: { value: 'mouse' },
  })
  for (const [key, value] of Object.entries(extra)) {
    Object.defineProperty(event, key, { value })
  }
  target.dispatchEvent(event)
}
function fixture(doc = document, keep = false) {
  const enabled = ref(true),
    fullscreen = ref(false),
    visible = ref(true)
  let drag!: ReturnType<typeof useDialogDrag>
  const Component = defineComponent({
    setup() {
      drag = useDialogDrag({ enabled, fullscreen })
      return () => h('div', { onPointerdown: drag.handlePointerDown }, 'Drag')
    },
  })
  const owner = mount(
    keep ? { render: () => h(KeepAlive, null, () => (visible.value ? h(Component) : h('span'))) } : Component,
    { attachTo: doc.body },
  )
  owners.push(owner)
  const down = () => pointer(owner.get('div').element, 'pointerdown', 10, 20)
  return {
    owner,
    enabled,
    fullscreen,
    visible,
    down,
    get drag() {
      return drag
    },
  }
}
test('disabling during an active gesture immediately stops movement', async () => {
  const state = fixture()
  state.down()
  pointer(document, 'pointermove', 50, 40)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
  state.enabled.value = false
  await nextTick()
  pointer(document, 'pointermove', 100, 80)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
  state.enabled.value = true
  await nextTick()
  state.down()
  pointer(document, 'pointermove', 30, 30)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([60, 30])
})
test('fullscreen resets the offset and ends the active gesture', async () => {
  const state = fixture()
  state.down()
  pointer(document, 'pointermove', 50, 40)
  state.fullscreen.value = true
  await nextTick()
  pointer(document, 'pointermove', 100, 80)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([0, 0])
})
test('only the initiating pointer can move or end a gesture', () => {
  const state = fixture()
  state.down()
  pointer(document, 'pointermove', 90, 90, 2)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([0, 0])
  pointer(document, 'pointerup', 90, 90, 2)
  pointer(document, 'pointermove', 50, 40)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
  pointer(document, 'pointercancel', 50, 40)
  pointer(document, 'pointermove', 90, 90)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
})
test('secondary pointers cannot replace a primary gesture', () => {
  const state = fixture()
  state.down()
  pointer(state.owner.get('div').element, 'pointerdown', 90, 90, 2, { isPrimary: false })
  pointer(document, 'pointermove', 50, 40)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
})
test('listeners belong to the target owner document rather than the ambient window', () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  frames.push(iframe)
  const doc = iframe.contentDocument!,
    state = fixture(doc)
  state.down()
  pointer(document, 'pointermove', 90, 90)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([0, 0])
  pointer(doc, 'pointermove', 50, 40)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
  pointer(doc, 'pointerup', 50, 40)
  pointer(doc, 'pointermove', 90, 90)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
})
test('KeepAlive deactivation releases the gesture and activation permits a new gesture', async () => {
  const state = fixture(document, true)
  state.down()
  pointer(document, 'pointermove', 50, 40)
  state.visible.value = false
  await nextTick()
  pointer(document, 'pointermove', 100, 80)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
  state.visible.value = true
  await nextTick()
  state.down()
  pointer(document, 'pointermove', 30, 30)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([60, 30])
})
test('owner view blur and explicit reset release active gestures', () => {
  const state = fixture()
  state.down()
  pointer(document, 'pointermove', 50, 40)
  window.dispatchEvent(new Event('blur'))
  pointer(document, 'pointermove', 100, 80)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([40, 20])
  state.down()
  state.drag.reset()
  pointer(document, 'pointermove', 100, 80)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([0, 0])
})

for (const change of [{ draggable: false }, { fullscreen: true }, { open: false }]) {
  test(`actual Dialog stops the current gesture after ${JSON.stringify(change)}`, async () => {
    const owner = mount(Dialog, {
      attachTo: document.body,
      props: { open: true, draggable: true, title: 'Drag', popupContainer: false },
    })
    owners.push(owner)
    await flushPromises()
    const dialog = owner.get('[role="dialog"]')
    pointer(dialog.element.firstElementChild!, 'pointerdown', 10, 20)
    pointer(document, 'pointermove', 50, 40)
    await nextTick()
    expect((dialog.element as HTMLElement).style.transform).toBe('translate(40px, 20px)')
    await owner.setProps(change)
    await flushPromises()
    const stopped = (dialog.element as HTMLElement).style.transform
    pointer(document, 'pointermove', 100, 80)
    await nextTick()
    expect((dialog.element as HTMLElement).style.transform).toBe(stopped)
  })
}
test('pointer capture belongs to the current pointer and is released when disabled', async () => {
  const state = fixture(),
    target = state.owner.get('div').element as HTMLElement
  let captured: number | undefined
  const released: number[] = []
  target.setPointerCapture = (id) => {
    captured = id
  }
  target.hasPointerCapture = (id) => captured === id
  target.releasePointerCapture = (id) => {
    released.push(id)
    captured = undefined
  }
  state.down()
  expect(captured).toBe(1)
  state.enabled.value = false
  await nextTick()
  expect(released).toEqual([1])
  state.enabled.value = true
  await nextTick()
  state.down()
  pointer(target, 'lostpointercapture', 0, 0)
  pointer(document, 'pointermove', 100, 80)
  expect([state.drag.x.value, state.drag.y.value]).toEqual([0, 0])
})

test('interactive header controls do not initiate a drag or lose their close action', async () => {
  const owner = mount(Dialog, {
    attachTo: document.body,
    props: { open: true, draggable: true, title: 'Drag', popupContainer: false },
  })
  owners.push(owner)
  await flushPromises()
  const dialog = owner.get('[role="dialog"]'),
    button = dialog.element.firstElementChild!.querySelector('button')!
  pointer(button, 'pointerdown', 10, 20)
  pointer(document, 'pointermove', 50, 40)
  await nextTick()
  expect((dialog.element as HTMLElement).style.transform).toBe('')
  button.click()
  await flushPromises()
  expect(owner.emitted('update:open')?.at(-1)).toEqual([false])
})
