import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Time from '../..'
import { delay, trigger } from '../../../utils/test'
import VarTimePicker from '../../TimePicker.vue'

test('timePicker plugin', () => {
  const app = createApp({}).use(Time)
  expect(app.component(VarTimePicker.name)).toBeTruthy()
})

test('timePicker defaults to picker presentation', () => {
  const wrapper = mount(VarTimePicker, { props: { format: 'HH:mm', modelValue: '11:20' } })
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.find('.mp-time-picker__clock-container').exists()).toBeFalsy()
  wrapper.unmount()
})

test('timePicker style and format', async () => {
  const template = `
    <mp-time-picker
      presentation="clock"
      :format="format"
      v-model="time"
      elevation
      title-color="purple"
      color="#7bb872"
    />
  `
  const wrapper = mount({
    components: {
      [VarTimePicker.name]: VarTimePicker,
    },
    data() {
      return {
        format: 'hh:mm A',
        time: '05:10 AM',
      }
    },
    template,
  })

  await delay(0)
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ format: 'HH:mm', time: '05:10' })
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('timePicker hint', async () => {
  const wrapper = mount(VarTimePicker, {
    props: { format: 'HH:mm', hint: 'choose clock-in time', presentation: 'clock' },
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setProps({
    hint: 'choose off-duty time',
  })
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('timePicker max and min', async () => {
  const template = `<mp-time-picker format="HH:mm" v-model="time" presentation="clock" :max="max" :min="min" />`
  const wrapper = mount({
    components: {
      [VarTimePicker.name]: VarTimePicker,
    },
    data() {
      return {
        time: '11:11',
        max: '11:11',
        min: undefined,
      }
    },
    template,
  })

  await delay(0)
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ max: undefined, min: '11:11' })
  await delay(200)
  // Midnight is on the inner ring in 24-hour mode; the outer 12 is noon.
  expect(
    wrapper
      .findAll('.mp-time-picker__clock-item')
      .find((item) => item.text() === '00')
      .classes(),
  ).toContain('mp-time-picker__clock-item--disable')
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ max: '11:11', min: '11:11' })
  await delay(200)
  expect(wrapper.find('.mp-time-picker__title-time').text()).toBe('11:11')

  const el = wrapper.find('.mp-time-picker__clock-container')
  await trigger(el, 'touchstart', 50, 30)
  await trigger(el, 'touchmove', 60, 25)
  await trigger(el, 'touchend', 60, 25)

  await delay(200)
  expect(wrapper.find('.mp-time-picker__title-time').text()).toBe('11:11')

  await wrapper.find('.mp-time-picker__title-btn').trigger('click')
  await wrapper.find('.mp-time-picker__clock-item').trigger('click')
  expect(wrapper.find('.mp-time-picker__title-time').text()).toBe('11:11')
  wrapper.unmount()
})

test('timePicker second precision from format', () => {
  const wrapper = mount(VarTimePicker, {
    props: {
      modelValue: '11:11:00',
      presentation: 'clock',
      format: 'HH:mm:ss',
    },
  })

  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('timePicker readonly', async () => {
  const template = `<mp-time-picker format="HH:mm" v-model="time" presentation="clock" readonly />`
  const wrapper = mount({
    components: {
      [VarTimePicker.name]: VarTimePicker,
    },
    data() {
      return {
        time: '11:11',
      }
    },
    template,
  })

  await delay(0)

  const el = wrapper.find('.mp-time-picker__clock-container')

  await trigger(el, 'touchstart', 40, 30)
  await trigger(el, 'touchmove', 20, 25)
  await trigger(el, 'touchend', 30, 25)

  await delay(200)
  expect(wrapper.find('.mp-time-picker__title-time').text()).toBe('11:11')

  await wrapper.find('.mp-time-picker__title-btn').trigger('click')
  await wrapper.find('.mp-time-picker__clock-item').trigger('click')

  expect(wrapper.find('.mp-time-picker__title-time').text()).toBe('11:11')
  wrapper.unmount()
})

test('timePicker v-model and onChange event', async () => {
  const change = vi.fn()

  const template = `<mp-time-picker disable-confirm v-model="time" presentation="clock" format="HH:mm:ss" @change="change" />`
  const wrapper = mount({
    components: {
      [VarTimePicker.name]: VarTimePicker,
    },
    data() {
      return {
        time: '11:11:11',
      }
    },
    methods: {
      change,
    },
    template,
  })

  await delay(0)

  const el = wrapper.find('.mp-time-picker__clock-container')

  await trigger(el, 'touchstart', 40, 30)
  await trigger(el, 'touchmove', 20, 25)
  await trigger(el, 'touchend', 30, 25)

  await delay(200)
  expect(wrapper.find('.mp-time-picker__title-time').text()).not.toBe('11:11:11')
  expect(wrapper.find('.mp-time-picker__title-time').findAll('.mp-time-picker__title-btn')[1].text()).toBe('11')
  expect(wrapper.find('.mp-time-picker__title-time').findAll('.mp-time-picker__title-btn')[2].text()).toBe('11')

  await wrapper.find('.mp-time-picker__title-time').findAll('.mp-time-picker__title-btn')[1].trigger('click')
  await delay(200)
  await trigger(el, 'touchstart', 40, 30)
  await trigger(el, 'touchmove', 20, 25)
  await trigger(el, 'touchend', 30, 25)
  expect(wrapper.find('.mp-time-picker__title-time').findAll('.mp-time-picker__title-btn')[1].text()).not.toBe('11')
  expect(wrapper.find('.mp-time-picker__title-time').findAll('.mp-time-picker__title-btn')[2].text()).toBe('11')

  await wrapper.find('.mp-time-picker__title-time').findAll('.mp-time-picker__title-btn')[2].trigger('click')
  await delay(200)
  await trigger(el, 'touchstart', 40, 30)
  await trigger(el, 'touchmove', 20, 25)
  await trigger(el, 'touchend', 30, 25)
  expect(wrapper.find('.mp-time-picker__title-time').findAll('.mp-time-picker__title-btn')[2].text()).not.toBe('11')
  expect(wrapper.vm.time).not.toBe('11:11:11')
  expect(change).toHaveBeenCalled()
  wrapper.unmount()
})

test('timePicker switch ampm', async () => {
  const template = `<mp-time-picker disable-confirm format="HH:mm:ss" use12-hours v-model="time" presentation="clock" :min="min" max="19:40:22" />`
  const wrapper = mount({
    components: {
      [VarTimePicker.name]: VarTimePicker,
    },
    data() {
      return {
        format: 'HH:mm',
        time: '05:10:22',
        min: '2:38:38',
      }
    },
    template,
  })

  await delay(0)
  await wrapper.find('.mp-time-picker__title-ampm').findAll('.mp-time-picker__title-btn')[1].trigger('click')
  expect(wrapper.vm.time).toBe('17:10:22')

  await wrapper.setData({ min: '6:00:00' })
  await wrapper.find('.mp-time-picker__title-ampm').findAll('.mp-time-picker__title-btn')[0].trigger('click')
  expect(wrapper.vm.time).toBe('06:10:22')
  wrapper.unmount()
})

test('timePicker titleColor', async () => {
  const wrapper = mount(VarTimePicker, {
    props: { format: 'HH:mm', titleColor: 'green', presentation: 'clock' },
  })

  expect(wrapper.find('.mp-time-picker__title').attributes('style')).toContain('background: green')

  await wrapper.setProps({
    titleColor: 'red',
  })
  expect(wrapper.find('.mp-time-picker__title').attributes('style')).toContain('background: red')
  wrapper.unmount()
})

test('timePicker reset when modelValue is undefined or an empty string', async () => {
  const wrapper = mount({
    components: {
      [VarTimePicker.name]: VarTimePicker,
    },
    data() {
      return {
        time: '10:22',
      }
    },
    template: `<mp-time-picker format="HH:mm" v-model="time" presentation="clock" />`,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ time: undefined })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ time: '20:30' })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ time: '' })
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})
