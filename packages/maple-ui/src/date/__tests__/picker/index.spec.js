import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs/esm'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Date from '../..'
import { delay, mockConsole, mockScrollIntoView, triggerDrag } from '../../../utils/test'
import VarDatePicker from '../../DatePicker.vue'

mockScrollIntoView()
afterEach(() => vi.useRealTimers())

const [currentYear, currentMonth] = dayjs().format('YYYY-MM').split('-')

test('datePicker plugin', () => {
  const app = createApp({}).use(Date)
  expect(app.component(VarDatePicker.name)).toBeTruthy()
})

describe('test datePicker style and type', () => {
  test('datePicker style and date', async () => {
    const template = `
    <mp-date-picker
      v-model="date"
      elevation
      title-color="purple"
      color="#7bb872"
      :show-current="false"
    />
  `
    const wrapper = mount({
      components: {
        [VarDatePicker.name]: VarDatePicker,
      },
      data() {
        return {
          date: '2021-04-08',
        }
      },
      template,
    })

    await delay(0)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('datePicker style and month', async () => {
    const template = `
    <mp-date-picker
      v-model="date"
      type="month"
      elevation
      title-color="purple"
      color="#7bb872"
      :show-current="false"
    />
  `
    const wrapper = mount({
      components: {
        [VarDatePicker.name]: VarDatePicker,
      },
      data() {
        return {
          date: '2021-04',
        }
      },
      template,
    })

    await delay(0)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })
})

test('datePicker style and type', async () => {
  const template = `
    <mp-date-picker
      :type="type"
      v-model="date"
      elevation
      title-color="purple"
      color="#7bb872"
      :show-current="false"
    />
  `
  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        type: 'month',
        date: '2021-05',
      }
    },
    template,
  })

  await delay(0)
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ type: 'date', date: '2021-05-19' })
  await delay(200)
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('datePicker disabledDate', () => {
  // 当前按钮也受禁用规则控制，固定为偶数日避免快照随运行日期漂移。
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new globalThis.Date(2026, 0, 2, 9))
  const wrapper = mount(VarDatePicker, {
    props: {
      disabledDate: (val) => val.getDate() % 2 === 0,
      modelValue: '2021-03-01',
    },
  })

  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
  vi.useRealTimers()
})

test('datePicker dayStartOfWeek', async () => {
  const wrapper = mount(VarDatePicker, {
    props: {
      dayStartOfWeek: 3,
      modelValue: '2021-03-01',
      presentation: 'calendar',
    },
  })

  await delay(0)
  expect(wrapper.find('.mp-day-picker__head').find('li').text()).toBe('三')

  wrapper.unmount()
})

test('datePicker omits the single summary even with hint text', async () => {
  const wrapper = mount(VarDatePicker, {
    props: {
      hint: '选择日期',
      presentation: 'calendar',
    },
  })

  await delay(100)
  expect(wrapper.find('.mp-date-picker__summary').exists()).toBe(false)

  await wrapper.setProps({
    hint: '选择打卡日期',
  })
  await delay(100)
  expect(wrapper.find('.mp-date-picker__summary').exists()).toBe(false)

  wrapper.unmount()
})

test('datePicker max and min', async () => {
  const wrapper = mount(VarDatePicker, {
    props: {
      max: '2021-04-08',
      min: '2021-04-08',
      modelValue: '2021-04-08',
      presentation: 'calendar',
    },
  })

  await delay(0)
  expect(wrapper.find('.mp-date-picker-header__value').text()).toBe('2021 四月')

  await wrapper.find('.mp-date-picker-header').find('button').trigger('click')
  await delay(200)
  expect(wrapper.find('.mp-date-picker-header__value').text()).toBe('2021 四月')

  await wrapper.find('.mp-date-picker-header__value').trigger('click')
  await delay(200)
  await wrapper.find('.mp-date-picker-header__value').trigger('click')
  await delay(200)
  expect(wrapper.find('.mp-year-picker').findAll('li').length).toBe(100)

  wrapper.unmount()
})

test('datePicker v-model', async () => {
  const template = `<mp-date-picker :type="type" v-model="date" presentation="calendar" />`

  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        type: 'month',
        date: '2021-05',
      }
    },
    template,
  })

  await delay(0)
  await wrapper.find('.mp-date-picker-header').find('button').trigger('click')
  await delay(200)
  await wrapper.find('.mp-month-picker__content').find('ul').find('button').trigger('click')
  expect(wrapper.vm.date).toBe('2020-01')

  await wrapper.find('.mp-date-picker-header__value').trigger('click')
  await delay(200)
  await wrapper.get('.mp-date-picker-header__arrow').trigger('click')
  await wrapper.find('.mp-year-picker').find('li').find('button').trigger('click')
  await delay(200)
  await wrapper.find('.mp-month-picker__content').find('ul').find('button').trigger('click')
  expect(wrapper.vm.date).not.toBe('2021-01')

  await wrapper.setData({ type: 'date', date: '2021-05-19' })
  await wrapper.find('.mp-date-picker-header').find('button').trigger('click')
  await delay(200)
  await wrapper.find('.mp-day-picker__button--usable').trigger('click')
  expect(wrapper.vm.date).toBe('2021-04-01')

  wrapper.unmount()
})

test('datePicker multiple', async () => {
  const template = `<mp-date-picker multiple v-model="date" :type="type"/>`

  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        type: 'date',
        date: ['2021-05-19'],
      }
    },
    template,
  })

  await delay(0)
  const elements = wrapper.findAll('.mp-day-picker__button--usable').slice(0, 3)
  await elements[0].trigger('click')
  await elements[1].trigger('click')
  await elements[2].trigger('click')

  expect(wrapper.vm.date).toEqual(['2021-05-19', '2021-05-01', '2021-05-02', '2021-05-03'])

  await elements[0].trigger('click')
  expect(wrapper.vm.date).toEqual(['2021-05-19', '2021-05-02', '2021-05-03'])

  await wrapper.setData({ type: 'month', date: ['2021-05'] })
  await delay(0)

  const btn = wrapper.find('ul').find('button')
  await btn.trigger('click')
  expect(wrapper.vm.date).toEqual(['2021-05', '2021-01'])

  await wrapper.setData({ type: 'year', date: ['2021'] })
  await delay(0)

  const btn1 = wrapper.find('li').find('button')
  await btn1.trigger('click')
  expect(wrapper.vm.date).toEqual(['2021', `${currentYear.slice(0, 2)}00`])
  await delay(200)

  wrapper.unmount()
})

test('datePicker range', async () => {
  const fn = vi.fn()
  const { mockRestore } = mockConsole('error', fn)

  const template = `<mp-date-picker range presentation="calendar" :type="type" v-model="date" />`

  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        date: ['2021-05-19', '2021-05-18'],
        type: 'date',
      }
    },
    template,
  })

  await delay(0)
  const elements = wrapper.findAll('.mp-day-picker__button--usable').slice(0, 3)
  await elements[0].trigger('click')
  await elements[2].trigger('click')

  expect(wrapper.vm.date).toEqual(['2021-05-01', '2021-05-03'])

  await wrapper.setData({ type: 'month', date: null })
  await wrapper.setData({ type: 'month', date: ['2021-05', '2021-06'] })
  await delay(0)

  const lis = wrapper.find('.mp-month-picker__content').find('ul').findAll('li').slice(0, 3)
  await lis[0].find('button').trigger('click')
  await lis[2].find('button').trigger('click')
  expect(wrapper.vm.date).toEqual(['2021-01', '2021-03'])
  expect(wrapper.vm.date).toHaveLength(2)

  await wrapper.setData({ type: 'year', date: [currentYear, `${+currentYear + 2}`] })
  await delay(0)

  const lis1 = wrapper.find('.mp-year-picker').findAll('li').slice(0, 2)
  await lis1[0].find('button').trigger('click')
  await lis1[1].find('button').trigger('click')
  expect(wrapper.vm.date).toEqual([`${currentYear.slice(0, 2)}00`, `${currentYear.slice(0, 2)}01`])
  await delay(200)

  mockRestore()
  wrapper.unmount()
})

test('datePicker readonly', async () => {
  const template = `<mp-date-picker v-model="date" readonly :type="type" presentation="calendar" />`

  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        type: 'month',
        date: '2021-05',
      }
    },
    template,
  })

  await delay(0)
  await wrapper.find('.mp-month-picker__content').find('ul').find('button').trigger('click')
  await delay(200)
  expect(wrapper.vm.date).toBe('2021-05')

  await wrapper.setData({ type: 'date', date: '2021-05-19' })
  await wrapper.find('.mp-day-picker__button--usable').trigger('click')
  await delay(200)
  expect(wrapper.vm.date).toBe('2021-05-19')

  wrapper.unmount()
})

test('datePicker touchable', async () => {
  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        date: '2021-04-08',
        type: 'date',
      }
    },
    template: `<mp-date-picker v-model="date" :type="type" presentation="calendar" />`,
  })

  const pickBodyEl = wrapper.find('.mp-date-picker__body')
  const headerEl = wrapper.find('.mp-date-picker-header__value')

  await triggerDrag(pickBodyEl, 0, 100)
  expect(headerEl.text()).toBe('2021 四月')

  await triggerDrag(pickBodyEl, 100, 0)
  await delay(300)
  expect(headerEl.text()).toBe('2021 三月')

  wrapper.unmount()
})

test('datePicker value legal', async () => {
  const fn = vi.fn()
  const { mockRestore } = mockConsole('error', fn)
  const template = `<mp-date-picker v-model="date" :multiple="multiple" />`

  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        date: '2021-05-01',
        multiple: true,
      }
    },
    template,
  })

  await delay(0)
  await wrapper.setData({ multiple: false, date: [] })
  await delay(0)
  await wrapper.setData({ multiple: false, date: 'Invalid Date' })
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()

  mockRestore()
  wrapper.unmount()
})

test('datePicker does not restore a single summary when titleColor changes', async () => {
  const wrapper = mount(VarDatePicker, {
    props: {
      titleColor: 'red',
      presentation: 'calendar',
    },
  })

  await delay(100)
  expect(wrapper.find('.mp-date-picker__summary').exists()).toBe(false)

  await wrapper.setProps({
    titleColor: 'green',
  })
  await delay(100)
  expect(wrapper.find('.mp-date-picker__summary').exists()).toBe(false)

  wrapper.unmount()
})

test('datePicker rerender date panel when max or min changes', async () => {
  const wrapper = mount({
    components: {
      [VarDatePicker.name]: VarDatePicker,
    },
    data() {
      return {
        date: '2020-12-23',
        max: '2020-12-24',
        min: '2020-12-22',
      }
    },
    template: `<mp-date-picker v-model="date" :min="min" :max="max" />`,
  })

  await delay(100)
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({
    min: '2020-01-05',
    date: '2020-01-06',
    max: '2020-01-07',
  })
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('datePicker show-time calendarPicker', async () => {
  const wrapper = mount(VarDatePicker, {
    props: {
      modelValue: '2025-01-15 10:29',
      showTime: true,
      useSeconds: false,
      presentation: 'calendarPicker',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-date-picker__body').isVisible()).toBe(true)
  await wrapper.get('.mp-date-picker__view-toggle').trigger('click')
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-date-picker__column-label').length).toBe(2)
  expect(wrapper.find('.mp-time-picker').exists()).toBeFalsy()

  wrapper.unmount()
})

test('datePicker show-time picker', async () => {
  const wrapper = mount(VarDatePicker, {
    props: {
      modelValue: '2025-01-15 10:29',
      showTime: true,
      useSeconds: false,
      presentation: 'picker',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-date-picker__summary').exists()).toBe(false)
  expect(wrapper.get('.mp-date-picker__current-date').text()).toContain('2025-01-15')
  expect(wrapper.get('.mp-date-picker__current-time-value').text()).toBe('10:29')
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-date-picker__column-label').length).toBe(3)
  await wrapper.get('.mp-date-picker__view-toggle').trigger('click')
  expect(wrapper.findAll('.mp-date-picker__column-label').length).toBe(2)
  expect(wrapper.find('.mp-date-picker__view-tabs').exists()).toBeFalsy()

  wrapper.unmount()
})
