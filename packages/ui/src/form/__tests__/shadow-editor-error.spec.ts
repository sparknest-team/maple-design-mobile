import { defineComponent, h, nextTick, ref, shallowRef, Teleport } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import Slider from '../../slider'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test.each(['open', 'closed'] as const)('keeps editor errors in the control’s root (%s)', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode })
  const mountPoint = document.createElement('div')
  const inside = document.createElement('div')
  shadow.append(mountPoint, inside)
  const target = shallowRef<HTMLElement>(document.body)
  const form = ref<InstanceType<typeof Form>>()
  const model = { value: 20 }
  const owner = mount(
    defineComponent(
      () => () =>
        h(Form, { ref: form, model }, () =>
          h(FormItem, { field: 'value' }, () =>
            h(Slider, {
              open: true,
              editMode: 'popup',
              popupContainer: target.value,
              showInput: true,
              showTooltip: false,
              'aria-describedby': 'hint',
            }),
          ),
        ),
    ),
    { attachTo: mountPoint },
  )
  const settle = async () => {
    await nextTick()
    await flushPromises()
  }
  const check = (root: Document | ShadowRoot, message: string) => {
    const controls = Array.from(root.querySelectorAll('[role="slider"], input'))
    expect(controls.length).toBeGreaterThanOrEqual(2)
    for (const control of controls) {
      const ids = control.getAttribute('aria-describedby')?.split(/\s+/) ?? []
      expect(ids).toContain('hint')
      const errors = ids.filter((id) => id !== 'hint' && root.getElementById(id)?.textContent === message)
      if (message) {
        expect(errors).toHaveLength(1)
      } else {
        expect(ids).toEqual(['hint'])
      }
    }
  }
  try {
    await settle()
    form.value!.setFields({ value: { message: 'First error' } })
    await settle()
    check(document, 'First error')
    form.value!.setFields({ value: { message: 'Updated error' } })
    await settle()
    check(document, 'Updated error')
    target.value = inside
    await settle()
    check(shadow, 'Updated error')
    target.value = document.body
    await settle()
    check(document, 'Updated error')
    form.value!.clearValidate()
    await settle()
    check(document, '')
  } finally {
    owner.unmount()
    host.remove()
  }
})

test('independent forms sharing a popup target keep separate error text', async () => {
  const mountForm = (message: string) => {
    const host = document.createElement('div')
    document.body.append(host)
    const mountPoint = document.createElement('div')
    host.attachShadow({ mode: 'closed' }).append(mountPoint)
    const owner = mount(Form, {
      attachTo: mountPoint,
      props: { model: { value: 20 } },
      slots: {
        default: () =>
          h(FormItem, { field: 'value' }, () =>
            h(Teleport, { to: document.body }, [
              h(EditorPanel, { error: 'Editor failure' }, () =>
                h(Slider, {
                  editMode: 'direct',
                  showTooltip: false,
                  'aria-label': message,
                }),
              ),
            ]),
          ),
      },
    })
    owner.vm.setFields({ value: { message } })
    return () => {
      owner.unmount()
      host.remove()
    }
  }
  const first = mountForm('First form')
  const second = mountForm('Second form')
  try {
    await nextTick()
    await flushPromises()
    const ids = ['First form', 'Second form'].map((label) => {
      const control = document.querySelector(`[role="slider"][aria-label="${label}"]`)
      expect(control).toBeTruthy()
      const id = control!.getAttribute('aria-describedby')!
      const feedback = document.getElementById(id)
      expect(feedback?.textContent).toBe(label)
      expect(feedback?.hidden).toBe(true)
      expect(feedback?.hasAttribute('role')).toBe(false)
      return id
    })
    expect(new Set(ids).size).toBe(2)
  } finally {
    first()
    second()
  }
})
