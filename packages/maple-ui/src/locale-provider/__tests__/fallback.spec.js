import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import LocaleProvider from '..'
import Empty from '../../empty'
import Loading from '../../loading'
import Locale from '../../locale'
import { injectLocaleProvider } from '../provide'

const owners = []
afterEach(() => owners.splice(0).forEach((w) => w.unmount()))
const content = () => [h(Empty), h(Loading)]
test('empty and direction-only scopes retain global default words', () => {
  for (const props of [{}, { dir: 'rtl' }]) {
    const w = mount(LocaleProvider, { props, slots: { default: content } })
    owners.push(w)
    expect(w.get('.mp-empty__description').text()).toBe(Locale.zhCN.emptyDescription)
    expect(w.get('.mp-loading__sr-only').text()).toBe('加载中')
  }
})
test('empty nested scope inherits parent words and reacts to replacement', async () => {
  const messages = ref({ 'en-US': { emptyDescription: 'No records', 'loading.text': 'Waiting' } })
  const w = mount({
    render: () =>
      h(
        LocaleProvider,
        { locale: 'en-US', messages: messages.value },
        { default: () => h(LocaleProvider, { dir: 'rtl' }, { default: content }) },
      ),
  })
  owners.push(w)
  expect(w.get('.mp-empty__description').text()).toBe('No records')
  expect(w.get('.mp-loading__sr-only').text()).toBe('Waiting')
  messages.value = { 'en-US': { emptyDescription: 'No appointments', 'loading.text': 'Fetching' } }
  await nextTick()
  expect(w.get('.mp-empty__description').text()).toBe('No appointments')
  expect(w.get('.mp-loading__sr-only').text()).toBe('Fetching')
})
test('partial local messages retain empty strings and inherit missing words and dictionary values', () => {
  const Probe = {
    setup() {
      const { t } = injectLocaleProvider()
      return () => h('span', { id: 'dictionary' }, t('datePickerMonthDict')?.['01']?.name)
    },
  }
  const w = mount(LocaleProvider, {
    props: { locale: 'en-US', messages: { 'en-US': { ...Locale.enUS, emptyDescription: 'Parent' } } },
    slots: {
      default: () =>
        h(
          LocaleProvider,
          { messages: { 'zh-CN': { emptyDescription: '' } } },
          { default: () => [...content(), h(Probe)] },
        ),
    },
  })
  owners.push(w)
  expect(w.get('.mp-empty__description').text()).toBe('')
  expect(w.get('.mp-loading__sr-only').text()).toBe('Loading')
  expect(w.get('#dictionary').text()).toBe(Locale.enUS.datePickerMonthDict['01'].name)
})

test.each([null, undefined])('nullish local words inherit parent values: %s', (value) => {
  const w = mount(LocaleProvider, {
    props: { messages: { 'zh-CN': { emptyDescription: 'Parent empty' } } },
    slots: {
      default: () =>
        h(LocaleProvider, { messages: { 'zh-CN': { emptyDescription: value } } }, { default: () => h(Empty) }),
    },
  })
  owners.push(w)
  expect(w.get('.mp-empty__description').text()).toBe('Parent empty')
})

test('fallback remains reactive to global locale changes', async () => {
  const previous = Locale.currentMessage.value
  const w = mount(LocaleProvider, { slots: { default: content } })
  owners.push(w)
  try {
    Locale.currentMessage.value = Locale.enUS
    await nextTick()
    expect(w.get('.mp-empty__description').text()).toBe(Locale.enUS.emptyDescription)
    expect(w.get('.mp-loading__sr-only').text()).toBe('Loading')
  } finally {
    Locale.currentMessage.value = previous
    await nextTick()
  }
})
