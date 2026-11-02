import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import Demo from '../example/demos/async-fields.vue'

useDemoControls()

test('explicit field state commands invalidate pending native submit and allow a fresh submission', async () => {
  for (const command of ['清空校验', '写入服务端错误']) {
    for (const valid of [true, false]) {
      const wrapper = mount(Demo, {
        global: {
          components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space },
        },
      })
      const form = wrapper.getComponent(Form)
      const click = async (text) => {
        await wrapper
          .findAll('button')
          .find((button) => button.text() === text)
          .trigger('click')
        await flushPromises()
      }
      try {
        await wrapper.findAll('input')[0].setValue(valid ? 'admin' : 'guest')
        await wrapper.findAll('input')[1].setValue(valid ? '1234' : 'bad')
        await wrapper.get('form').trigger('submit')
        await flushPromises()
        await click(command)
        await click('返回用户名结果')
        await click('返回代码结果')
        expect(form.emitted('submit')).toBeUndefined()
        expect(form.emitted('submit-success')).toBeUndefined()
        expect(form.emitted('submit-failed')).toBeUndefined()
        if (command === '写入服务端错误') {
          expect(wrapper.text()).toContain('模拟服务端拒绝')
        } else {
          expect(wrapper.findAll('input').every((input) => input.attributes('aria-invalid') !== 'true')).toBe(true)
        }
        await wrapper.get('form').trigger('submit')
        await flushPromises()
        await click('返回代码结果')
        await click('返回用户名结果')
        expect(form.emitted('submit')).toHaveLength(1)
        expect(wrapper.get('.async-submit-status').text()).toBe(
          valid ? '原生提交：1；结果：通过' : '原生提交：1；结果：未通过',
        )
      } finally {
        wrapper.unmount()
      }
    }
  }
})

test('a newer imperative validation invalidates a pending native submission without preventing a fresh submit', async () => {
  for (const method of ['validate', 'validateField']) {
    for (const oldValid of [false, true]) {
      const wrapper = mount(Demo, {
        global: {
          components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space },
        },
      })
      const form = wrapper.getComponent(Form)
      const values = async (valid) => {
        await wrapper.findAll('input')[0].setValue(valid ? 'admin' : 'guest')
        await wrapper.findAll('input')[1].setValue(valid ? '1234' : 'bad')
      }
      const click = async (text) => {
        await wrapper
          .findAll('button')
          .find((button) => button.text() === text)
          .trigger('click')
        await flushPromises()
      }
      try {
        await values(oldValid)
        await wrapper.get('form').trigger('submit')
        await flushPromises()
        await values(!oldValid)
        const pending = method === 'validate' ? form.vm.validate() : form.vm.validateField('name')
        await flushPromises()
        await click('返回最新用户名结果')
        if (method === 'validate') {
          await click('返回最新代码结果')
        }
        await pending
        await click('返回用户名结果')
        await click('返回代码结果')
        expect(form.emitted('submit')).toBeUndefined()
        expect(form.emitted('submit-success')).toBeUndefined()
        expect(form.emitted('submit-failed')).toBeUndefined()
        await wrapper.get('form').trigger('submit')
        await flushPromises()
        await click('返回用户名结果')
        await click('返回代码结果')
        expect(form.emitted('submit')).toHaveLength(1)
        expect(wrapper.get('.async-submit-status').text()).toBe(
          oldValid ? '原生提交：1；结果：未通过' : '原生提交：1；结果：通过',
        )
      } finally {
        wrapper.unmount()
      }
    }
  }
})

test('late older submit results cannot append an event or overwrite the already completed newest submission', async () => {
  for (const oldValid of [false, true]) {
    const wrapper = mount(Demo, {
      global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
    })
    const form = wrapper.getComponent(Form)
    const click = async (text) => {
      await wrapper
        .findAll('button')
        .find((button) => button.text() === text)
        .trigger('click')
      await flushPromises()
    }
    const submit = async (valid) => {
      await wrapper.findAll('input')[0].setValue(valid ? 'admin' : 'guest')
      await wrapper.findAll('input')[1].setValue(valid ? '1234' : 'bad')
      await wrapper.get('form').trigger('submit')
      await flushPromises()
    }
    try {
      await submit(oldValid)
      await submit(!oldValid)
      await click('返回最新代码结果')
      expect(form.emitted('submit')).toBeUndefined()
      await click('返回最新用户名结果')
      expect(form.emitted('submit')).toHaveLength(1)
      const result = wrapper.get('.async-submit-status').text()
      expect(result).toBe(oldValid ? '原生提交：1；结果：未通过' : '原生提交：1；结果：通过')
      await click('返回用户名结果')
      await click('返回代码结果')
      expect(form.emitted('submit')).toHaveLength(1)
      expect(wrapper.get('.async-submit-status').text()).toBe(result)
      expect(
        wrapper.findAll('input').every((field) => (field.attributes('aria-invalid') === 'true') === oldValid),
      ).toBe(true)
      expect(wrapper.get('p[role=status]').text()).toContain('用户名等待：0；代码等待：0')
    } finally {
      wrapper.unmount()
    }
  }
})

test('a newer native submit supersedes the previous submission without mixing old errors and current values', async () => {
  for (const oldValid of [false, true]) {
    const wrapper = mount(Demo, {
      global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
    })
    const form = wrapper.getComponent(Form)
    const click = async (text) => {
      await wrapper
        .findAll('button')
        .find((button) => button.text() === text)
        .trigger('click')
      await flushPromises()
    }
    const submit = async (valid) => {
      await wrapper.findAll('input')[0].setValue(valid ? 'admin' : 'guest')
      await wrapper.findAll('input')[1].setValue(valid ? '1234' : 'bad')
      await wrapper.get('form').trigger('submit')
      await flushPromises()
    }
    try {
      await submit(oldValid)
      await submit(!oldValid)
      await click('返回用户名结果')
      await click('返回代码结果')
      expect(form.emitted('submit')).toBeUndefined()
      expect(wrapper.get('.async-submit-status').text()).toBe('原生提交：0；结果：-')
      await click('返回代码结果')
      expect(form.emitted('submit')).toBeUndefined()
      await click('返回用户名结果')
      expect(form.emitted('submit')).toHaveLength(1)
      expect(Boolean(form.emitted('submit')[0][0].errors)).toBe(oldValid)
      expect(wrapper.get('.async-submit-status').text()).toBe(
        oldValid ? '原生提交：1；结果：未通过' : '原生提交：1；结果：通过',
      )
    } finally {
      wrapper.unmount()
    }
  }
})

test('pending native submissions cannot emit after disposal or KeepAlive suspension', async () => {
  for (const suspend of [false, true]) {
    const Host = defineComponent({
      setup() {
        const active = ref(true)
        return () =>
          h('div', [
            h(
              'button',
              {
                class: 'suspend-form',
                onClick: () => {
                  active.value = false
                },
              },
              'Suspend',
            ),
            h(KeepAlive, null, { default: () => (active.value ? h(Demo, { editMode: 'direct' }) : null) }),
          ])
      },
    })
    const wrapper = mount(Host, {
      global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
    })
    const form = wrapper.getComponent(Form)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    if (suspend) {
      await wrapper.get('.suspend-form').trigger('click')
    } else {
      wrapper.unmount()
    }
    await flushPromises()
    expect(form.emitted('submit')).toBeUndefined()
    expect(form.emitted('submit-success')).toBeUndefined()
    expect(form.emitted('submit-failed')).toBeUndefined()
    if (suspend) {
      wrapper.unmount()
    }
  }
})

test('reset during native async submit suppresses stale submit events and permits a fresh submission', async () => {
  for (const nativeReset of [false, true]) {
    const wrapper = mount(Demo, {
      global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
    })
    const click = async (text) => {
      await wrapper
        .findAll('button')
        .find((button) => button.text() === text)
        .trigger('click')
      await flushPromises()
    }
    const form = wrapper.getComponent(Form)
    try {
      await wrapper.findAll('input')[0].setValue(nativeReset ? 'admin' : 'guest')
      await wrapper.findAll('input')[1].setValue(nativeReset ? '1234' : 'bad')
      await wrapper.get('form').trigger('submit')
      await flushPromises()
      if (nativeReset) {
        await wrapper.get('form').trigger('reset')
      } else {
        await click('重置两个字段')
      }
      await click('返回用户名结果')
      await click('返回代码结果')
      expect(form.emitted('submit')).toBeUndefined()
      expect(form.emitted('submit-success')).toBeUndefined()
      expect(form.emitted('submit-failed')).toBeUndefined()
      expect(wrapper.get('.async-submit-status').text()).toBe('原生提交：0；结果：-')
      await wrapper.findAll('input')[0].setValue('admin')
      await wrapper.findAll('input')[1].setValue('1234')
      await wrapper.get('form').trigger('submit')
      await flushPromises()
      await click('返回代码结果')
      await click('返回用户名结果')
      expect(wrapper.get('.async-submit-status').text()).toBe('原生提交：1；结果：通过')
      expect(form.emitted('submit')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  }
})

test('native submit waits for both async fields, reports failure, then retries successfully', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
  })
  const click = async (text) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === text)
      .trigger('click')
    await flushPromises()
  }
  const status = () => wrapper.get('.async-submit-status').text()
  const submit = async () => {
    await wrapper.get('form').trigger('submit')
    await flushPromises()
  }
  try {
    await wrapper.findAll('input')[0].setValue('guest')
    await wrapper.findAll('input')[1].setValue('1234')
    await submit()
    expect(status()).toBe('原生提交：0；结果：-')
    await click('返回用户名结果')
    expect(status()).toBe('原生提交：0；结果：-')
    expect(wrapper.findAll('input')[0].attributes('aria-invalid')).toBe('true')
    await click('返回代码结果')
    expect(status()).toBe('原生提交：1；结果：未通过')
    await wrapper.findAll('input')[0].setValue('admin')
    await submit()
    await click('返回代码结果')
    expect(status()).toBe('原生提交：1；结果：未通过')
    await click('返回用户名结果')
    expect(status()).toBe('原生提交：2；结果：通过')
    expect(wrapper.getComponent(Form).emitted('submit')).toHaveLength(2)
    expect(wrapper.getComponent(Form).emitted('submit-success')).toHaveLength(1)
    expect(wrapper.getComponent(Form).emitted('submit-failed')).toHaveLength(1)
    expect(wrapper.findAll('input').every((field) => field.attributes('aria-invalid') !== 'true')).toBe(true)
    await click('重置两个字段')
    expect(wrapper.findAll('input').every((field) => field.element.value === '')).toBe(true)
    expect(status()).toBe('原生提交：2；结果：通过')
  } finally {
    wrapper.unmount()
  }
})

test('reset after one field completes isolates an immediate new whole-form run', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
  })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  const fields = () => wrapper.findAll('input')
  const status = () => wrapper.get('[role=status]').text()
  const fill = async (valid) => {
    await fields()[0].setValue(valid ? 'admin' : 'guest')
    await fields()[1].setValue(valid ? '1234' : 'bad')
  }
  try {
    for (const oldValid of [false, true]) {
      await fill(oldValid)
      await click('校验两个字段')
      await click('返回用户名结果')
      expect(fields()[0].attributes('aria-invalid') === 'true').toBe(!oldValid)
      await click('重置两个字段')
      expect(fields().every((field) => field.element.value === '' && field.attributes('aria-invalid') !== 'true')).toBe(
        true,
      )
      expect(status()).toContain('已重置；用户名等待：0；代码等待：1')
      await fill(!oldValid)
      await click('校验两个字段')
      expect(status()).toContain('用户名等待：1；代码等待：2')
      await click('返回代码结果')
      expect(status()).toContain('校验中；用户名等待：1；代码等待：1')
      expect(fields().every((field) => field.attributes('aria-invalid') !== 'true')).toBe(true)
      await click('返回代码结果')
      expect(status()).toContain('校验中；用户名等待：1；代码等待：0')
      expect(fields()[1].attributes('aria-invalid') === 'true').toBe(oldValid)
      await click('返回用户名结果')
      expect(status()).toContain(oldValid ? '未通过' : '通过')
      expect(status()).toContain('用户名等待：0；代码等待：0')
      expect(fields().every((field) => (field.attributes('aria-invalid') === 'true') === oldValid)).toBe(true)
    }
  } finally {
    wrapper.unmount()
  }
})

test('overlapping whole-form runs ignore the old aggregate and preserve latest field feedback', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
  })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  const fields = () => wrapper.findAll('input')
  const status = () => wrapper.get('p[role=status]').text()
  const fill = async (valid) => {
    await fields()[0].setValue(valid ? 'admin' : 'guest')
    await fields()[1].setValue(valid ? '1234' : 'bad')
  }
  try {
    for (const oldValid of [false, true]) {
      await fill(oldValid)
      await click('校验两个字段')
      await fill(!oldValid)
      await click('校验两个字段')
      expect(status()).toContain('用户名等待：2；代码等待：2')
      await click('返回用户名结果')
      await click('返回代码结果')
      expect(status()).toContain('结果：校验中；用户名等待：1；代码等待：1')
      expect(fields().every((field) => field.attributes('aria-invalid') !== 'true')).toBe(true)
      await click('返回代码结果')
      expect(status()).toContain('结果：校验中；用户名等待：1；代码等待：0')
      expect(fields()[1].attributes('aria-invalid') === 'true').toBe(oldValid)
      await click('返回用户名结果')
      expect(status()).toContain(oldValid ? '结果：未通过' : '结果：通过')
      expect(status()).toContain('用户名等待：0；代码等待：0')
      expect(fields().every((field) => (field.attributes('aria-invalid') === 'true') === oldValid)).toBe(true)
    }
  } finally {
    wrapper.unmount()
  }
})

test('two async fields aggregate only after both finish and reset invalidates both old results', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
  })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  const fields = () => wrapper.findAll('input')
  const status = () => wrapper.get('p[role=status]').text()
  try {
    await fields()[0].setValue('guest')
    await fields()[1].setValue('1234')
    await click('校验两个字段')
    await click('返回用户名结果')
    expect(status()).toContain('结果：校验中')
    expect(fields()[0].attributes('aria-invalid')).toBe('true')
    await click('返回代码结果')
    expect(status()).toContain('结果：未通过')
    expect(fields()[1].attributes('aria-invalid')).not.toBe('true')
    await fields()[0].setValue('admin')
    await click('校验两个字段')
    await click('返回代码结果')
    expect(status()).toContain('结果：校验中')
    await click('返回用户名结果')
    expect(status()).toContain('结果：通过')
    await fields()[0].setValue('guest')
    await fields()[1].setValue('bad')
    await click('校验两个字段')
    await click('重置两个字段')
    await click('返回用户名结果')
    await click('返回代码结果')
    expect(status()).toContain('结果：已重置')
    expect(fields().every((field) => field.element.value === '' && field.attributes('aria-invalid') !== 'true')).toBe(
      true,
    )
  } finally {
    wrapper.unmount()
  }
})
