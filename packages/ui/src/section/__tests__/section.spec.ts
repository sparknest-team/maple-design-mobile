import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { Locale } from '@maple-design/ui-vue'
import Button from '../../button'
import Checkbox from '../../checkbox'
import Form from '../../form'
import Input from '../../input'
import Radio from '../../radio'
import Space from '../../space'
import Section from '..'
import CardDemo from '../example/demos/card.vue'
import HeadingOptions from '../example/demos/heading-options.vue'
import InlineForm from '../example/demos/inline-form.vue'
import LineDemo from '../example/demos/line.vue'
import PlainDemo from '../example/demos/plain.vue'

const global = { plugins: [Section, Button, Checkbox, Radio, Space, Form, Input] }

describe('Section documentation examples', () => {
  it('renders the plain heading and the custom card heading at their documented levels', () => {
    const plain = mount(PlainDemo, { global })
    expect(plain.get('section').classes()).toContain('mp-section--plain')
    expect(plain.get('h2').text()).toBeTruthy()
    plain.unmount()
    const card = mount(CardDemo, { global })
    expect(card.get('section').classes()).toContain('mp-section--card')
    expect(card.get('h3').text()).toBeTruthy()
    card.unmount()
  })
  it('updates a mounted demo when the site changes the global locale', async () => {
    const previous = Locale.currentMessage.value
    Locale.add('en-US', Locale.enUS)
    const page = mount(PlainDemo, { global })
    try {
      for (const [language, title] of [['en-US', 'Member permissions'], ['zh-CN', '成员权限']]) {
        Locale.use(language)
        await nextTick()
        expect(page.get('h2').text()).toBe(title)
      }
    } finally {
      Locale.currentMessage.value = previous
      page.unmount()
    }
  })
  it('expands release history from the line header', async () => {
    const page = mount(LineDemo, { global })
    expect(page.findAll('li')).toHaveLength(1)
    await page.get('button').trigger('click')
    expect(page.findAll('li')).toHaveLength(2)
    page.unmount()
  })
  it('toggles headings and descriptions independently for every variant', async () => {
    const page = mount(HeadingOptions, { global })
    const section = page.get('section')
    const [title, description] = page.findAll('input[type="checkbox"]')
    const radios = page.findAll('input[type="radio"]')
    expect(radios).toHaveLength(3)
    for (const [index, variant] of ['plain', 'line', 'card'].entries()) {
      await radios[index].setValue(true)
      expect(section.classes()).toContain(`mp-section--${variant}`)
      expect(section.find('h2').exists()).toBe(false)
      expect(section.attributes('aria-describedby')).toBeUndefined()
      await title.setValue(true)
      expect(section.get('h2').attributes('id')).toBe(section.attributes('aria-labelledby'))
      await description.setValue(true)
      expect(section.attributes('aria-describedby')).toBeTruthy()
      await title.setValue(false)
      expect(section.find('h2').exists()).toBe(false)
      expect(section.attributes('aria-describedby')).toBeTruthy()
      await description.setValue(false)
    }
    page.unmount()
  })
  it('adapts to an inline form and retains edited field values', async () => {
    const page = mount(InlineForm, { global })
    const section = page.get('section')
    expect(section.classes()).toContain('mp-section--line')
    expect(section.get('h3').text()).toBe('成员信息')
    expect(section.find('.mp-section__content--inline').exists()).toBe(true)
    const inputs = section.findAll('input')
    expect(inputs).toHaveLength(2)
    await inputs[0].setValue('Alex')
    expect(inputs[0].element.value).toBe('Alex')
    page.unmount()
  })
})
