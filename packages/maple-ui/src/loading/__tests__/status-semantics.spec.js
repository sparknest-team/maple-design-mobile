import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Loading, { Loading as NamedLoading, vLoading } from '..'
import LocaleProvider from '../../locale-provider'

const owners = [],
  hosts = []
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
  hosts.splice(0).forEach((el) => {
    vLoading.unmounted(el)
    el.remove()
  })
})
test('standalone loading has meaningful status text even when its graphic is hidden', () => {
  for (const hideIcon of [false, true]) {
    const w = mount(Loading, { props: { hideIcon } })
    owners.push(w)
    expect(w.attributes('role')).toBe('status')
    expect(w.attributes('aria-atomic')).toBe('true')
    expect(w.get('.mp-loading__sr-only').text()).toBe('加载中')
  }
})
test('visible tip or tip slot supplies the status message without duplicate fallback text', () => {
  for (const options of [
    { props: { tip: 'Fetching results' } },
    { slots: { tip: () => h('span', 'Fetching records') } },
  ]) {
    const w = mount(Loading, options)
    owners.push(w)
    expect(w.find('.mp-loading__sr-only').exists()).toBe(false)
    expect(w.text()).toContain('Fetching')
  }
})
test('directive marks and restores its original waiting host across migration and teardown', () => {
  for (const previous of [null, 'false', 'true']) {
    const el = document.createElement('section')
    document.body.append(el)
    hosts.push(el)
    if (previous !== null) {
      el.setAttribute('aria-busy', previous)
    }
    vLoading.mounted(el, { value: true, instance: null })
    expect(el.getAttribute('aria-busy')).toBe('true')
    vLoading.updated(el, { value: { loading: true, fullscreen: true }, instance: null })
    expect(el.getAttribute('aria-busy')).toBe('true')
    vLoading.updated(el, { value: false, instance: null })
    expect(el.getAttribute('aria-busy')).toBe(previous)
  }
})
test('teardown does not overwrite a later external busy value', () => {
  const el = document.createElement('section')
  document.body.append(el)
  hosts.push(el)
  vLoading.mounted(el, { value: true, instance: null })
  el.setAttribute('aria-busy', 'false')
  vLoading.unmounted(el)
  expect(el.getAttribute('aria-busy')).toBe('false')
})

test('status fallback follows the nearest reactive locale provider', async () => {
  expect(NamedLoading).toBe(Loading)
  const locale = ref('en-US')
  const messages = { 'en-US': { 'loading.text': 'Loading records' }, 'zh-CN': { 'loading.text': '加载记录' } }
  const w = mount({
    render: () => h(LocaleProvider, { locale: locale.value, messages }, { default: () => h(Loading) }),
  })
  owners.push(w)
  expect(w.get('.mp-loading__sr-only').text()).toBe('Loading records')
  locale.value = 'zh-CN'
  await nextTick()
  expect(w.get('.mp-loading__sr-only').text()).toBe('加载记录')
})
