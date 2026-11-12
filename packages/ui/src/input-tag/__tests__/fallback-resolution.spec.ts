import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { InputTag } from '../index'

test('reinitializes saved primitive values when async fallback names arrive', async () => {
  const saved = ['shuai.meng', 'xiaoming', 'lisi']
  const initial = mount(InputTag, {
    props: { modelValue: saved, fallbackOption: (value) => ({ value, label: `旧${value}` }) },
  })
  expect(initial.findAll('.mp-input-tag__tag').map((item) => item.text())).toEqual([
    '旧shuai.meng',
    '旧xiaoming',
    '旧lisi',
  ])
  initial.unmount()

  const value = ref([...saved])
  const pretty = ref(false)
  const names = reactive<Record<string, string>>({})
  let resolveNames!: (result: Record<string, string>) => void
  let resolveLast!: (result: Record<string, string>) => void
  const request = new Promise<Record<string, string>>((resolve) => {
    resolveNames = resolve
  })
  const lastRequest = new Promise<Record<string, string>>((resolve) => {
    resolveLast = resolve
  })
  const loadNames = async (source: Promise<Record<string, string>>) => Object.assign(names, await source)
  const loading = loadNames(request)
  const loadingLast = loadNames(lastRequest)
  const updates = vi.fn((next: import('../types').InputTagValue) => {
    value.value = (next ?? []) as string[]
  })
  const Host = defineComponent(
    () => () =>
      h(InputTag, {
        modelValue: value.value,
        readPretty: pretty.value,
        fallbackOption: (id: string | number) =>
          names[String(id)] ? { value: id, label: names[String(id)] } : undefined,
        'onUpdate:modelValue': updates,
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  try {
    expect(owner.findAll('.mp-input-tag__tag').map((item) => item.text())).toEqual(saved)
    pretty.value = true
    await nextTick()
    expect(owner.text()).toContain('shuai.meng, xiaoming, lisi')
    resolveNames({ 'shuai.meng': '孟帅', xiaoming: '小明' })
    await loading
    await flushPromises()
    expect(owner.text()).toContain('孟帅, 小明, lisi')
    resolveLast({ lisi: '李四' })
    await loadingLast
    await flushPromises()
    expect(owner.text()).toContain('孟帅, 小明, 李四')
    expect(value.value).toEqual(saved)
    expect(updates).not.toHaveBeenCalled()
    expect(owner.getComponent(InputTag).emitted('change')).toBeUndefined()
    pretty.value = false
    await flushPromises()
    expect(owner.findAll('.mp-input-tag__tag').map((item) => item.text())).toEqual(['孟帅', '小明', '李四'])
    await owner.findAll('.mp-tag__close-btn')[1].trigger('click')
    await flushPromises()
    expect(value.value).toEqual(['shuai.meng', 'lisi'])
    names.xiaoming = '已删除'
    names.lisi = '李四更新'
    await nextTick()
    expect(owner.findAll('.mp-input-tag__tag').map((item) => item.text())).toEqual(['孟帅', '李四更新'])
    expect(updates).toHaveBeenCalledTimes(1)
    pretty.value = true
    await nextTick()
    expect(owner.text()).toContain('孟帅, 李四更新')
    expect(value.value).toEqual(['shuai.meng', 'lisi'])
  } finally {
    owner.unmount()
  }
})

test('primitive fallback updates without changing values and explicit objects keep their own labels', async () => {
  const titles = reactive<Record<string, string>>({})
  const fallback = vi.fn((value: string | number) =>
    titles[String(value)] === undefined ? undefined : { value: 'different', label: titles[String(value)] },
  )
  const owner = mount(InputTag, {
    props: {
      modelValue: [0, '0', 'url', { value: 'object', label: '对象原名', closable: true }],
      fallbackOption: fallback,
    },
  })
  try {
    expect(owner.findAll('.mp-input-tag__tag').map((item) => item.text())).toEqual(['0', '0', 'url', '对象原名'])
    expect(fallback).toHaveBeenCalledWith(0)
    expect(fallback).toHaveBeenCalledWith('0')
    expect(fallback).not.toHaveBeenCalledWith('object')
    titles.url = '网页标题'
    await nextTick()
    expect(owner.findAll('.mp-input-tag__tag').map((item) => item.text())).toEqual(['0', '0', '网页标题', '对象原名'])
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('change')).toBeUndefined()
    await owner.findAll('.mp-tag__close-btn')[2].trigger('click')
    expect(owner.emitted('update:modelValue')?.[0]?.[0]).toEqual([
      0,
      '0',
      { value: 'object', label: '对象原名', closable: true },
    ])
  } finally {
    owner.unmount()
  }
})

test('custom fields and format-tag compose with fallback without replacing the identity', async () => {
  const name = reactive({ title: '旧标题' })
  const owner = mount(InputTag, {
    props: {
      modelValue: ['original'],
      fieldNames: { value: 'id', label: 'name' },
      fallbackOption: (value) => ({ id: 'different', name: name.title }),
      formatTag: (data) => `标题：${data.name}`,
    },
  })
  try {
    expect(owner.text()).toContain('标题：旧标题')
    name.title = '新标题'
    await nextTick()
    expect(owner.text()).toContain('标题：新标题')
    await owner.get('.mp-tag__close-btn').trigger('click')
    expect(owner.emitted('update:modelValue')?.[0]?.[0]).toEqual([])
  } finally {
    owner.unmount()
  }
})

test.each([{ disabled: true }, { readonly: true }, { readPretty: true }])(
  'fallback remains reactive under %o',
  async (state) => {
    const names = reactive({ title: '初始' })
    const owner = mount(InputTag, {
      props: {
        modelValue: ['id'],
        ...state,
        fallbackOption: (value) => ({ value, label: names.title }),
      },
    })
    try {
      expect(owner.text()).toContain('初始')
      names.title = '更新'
      await nextTick()
      expect(owner.text()).toContain('更新')
      expect(owner.emitted('update:modelValue')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  },
)
