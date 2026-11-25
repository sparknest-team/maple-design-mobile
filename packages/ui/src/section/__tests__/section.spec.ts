import { h, nextTick } from 'vue'
import { Locale } from '@maple-design/ui-vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Section from '..'
import Button from '../../button'
import Checkbox from '../../checkbox'
import Form from '../../form'
import Input from '../../input'
import Radio from '../../radio'
import Space from '../../space'
import InlineForm from '../example/demos/inline-form.vue'
import LineDemo from '../example/demos/line.vue'
import OutlineDemo from '../example/demos/outline.vue'
import PlainDemo from '../example/demos/plain.vue'
import SizesDemo from '../example/demos/sizes.vue'
import SectionExamples from '../example/index.vue'

vi.mock('@maple-design/cli-vue/client', () => ({ onThemeChange: () => {} }))

const global = { plugins: [Section, Button, Checkbox, Radio, Space, Form, Input] }

describe('Section documentation examples', () => {
  it('renders the plain heading and the custom outline heading at their documented levels', () => {
    const plain = mount(PlainDemo, { global })
    expect(plain.get('section').classes()).toContain('mp-section--plain')
    expect(plain.get('h4').text()).toBeTruthy()
    plain.unmount()
    const outlined = mount(OutlineDemo, { global })
    expect(outlined.get('section').classes()).toContain('mp-section--outline')
    expect(outlined.get('h3').text()).toBeTruthy()
    outlined.unmount()
  })
  it('updates a mounted demo when the site changes the global locale', async () => {
    const previous = Locale.currentMessage.value
    Locale.add('en-US', Locale.enUS)
    const page = mount(SectionExamples, { global })
    try {
      for (const [language, title] of [
        ['en-US', 'Member permissions'],
        ['zh-CN', '成员权限'],
      ]) {
        Locale.use(language)
        await nextTick()
        expect(page.get('[data-demo="plain"] section h4').text()).toBe(title)
        expect(
          page.get('[data-demo="sizes"] [role="radiogroup"]:has(input[value="plain"])').attributes('aria-label'),
        ).toBe(language === 'en-US' ? 'Section style' : '分组风格')
      }
    } finally {
      Locale.currentMessage.value = previous
      page.unmount()
    }
  })
  it('previews size and heading level independently', async () => {
    const sizes = mount(SizesDemo, { global })
    await sizes.get('input[value="lg"]').setValue(true)
    expect(sizes.get('section').classes()).toContain('mp-section--size-lg')
    expect(sizes.get('h4').text()).toBeTruthy()
    for (const level of [1, 2, 3, 4, 5, 6]) {
      await sizes.get(`input[value="${level}"]`).setValue(true)
      expect(sizes.get('section').classes()).toContain('mp-section--size-lg')
      expect(sizes.get(`h${level}`).text()).toBeTruthy()
    }
    sizes.unmount()
  })
  it('expands release history from the line header', async () => {
    const page = mount(LineDemo, { global })
    expect(page.findAll('li')).toHaveLength(1)
    await page.get('button').trigger('click')
    expect(page.findAll('li')).toHaveLength(2)
    page.unmount()
  })
  it('toggles headings and descriptions independently for every variant', async () => {
    const page = mount(SizesDemo, { global })
    const section = page.get('section')
    const [title, description, marker] = page.findAll('input[type="checkbox"]')
    await title.setValue(false)
    await description.setValue(false)
    await marker.setValue(false)
    const radios = page.get('[aria-label="分组风格"]').findAll('input[type="radio"]')
    expect(radios).toHaveLength(4)
    for (const [index, variant] of ['plain', 'heading-line', 'tonal', 'outline'].entries()) {
      await radios[index].setValue(true)
      expect(section.classes()).toContain(`mp-section--${variant}`)
      expect(section.find('h4').exists()).toBe(false)
      expect(section.attributes('aria-describedby')).toBeUndefined()
      for (const status of ['default', 'info', 'success', 'warning', 'danger']) {
        await page.get(`input[value="${status}"]`).setValue(true)
        expect(section.classes()).toContain(`mp-section--${status}`)
      }
      await marker.setValue(true)
      expect((page.get('input[value="section"]').element as HTMLInputElement).checked).toBe(true)
      expect(section.find('.mp-section__surface--marked').exists()).toBe(true)
      await title.setValue(true)
      await page.get('input[value="section"]').setValue(true)
      expect(section.find('.mp-section__label--marked').exists()).toBe(false)
      await page.get('input[value="title"]').setValue(true)
      expect(section.find('.mp-section__surface--marked').exists()).toBe(false)
      expect(section.find('.mp-section__label--marked').exists()).toBe(true)
      await marker.setValue(false)
      expect(section.find('.mp-section__label--marked').exists()).toBe(false)
      expect(section.get('h4').attributes('id')).toBe(section.attributes('aria-labelledby'))
      await description.setValue(true)
      expect(section.attributes('aria-describedby')).toBeTruthy()
      await title.setValue(false)
      expect(section.find('h4').exists()).toBe(false)
      expect(section.attributes('aria-describedby')).toBeTruthy()
      await description.setValue(false)
    }
    page.unmount()
  })
  it('adapts to an inline form and retains edited field values', async () => {
    const page = mount(InlineForm, { global })
    const section = page.get('section')
    expect(section.classes()).toContain('mp-section--heading-line')
    expect(section.get('h4').text()).toBe('成员信息')
    expect(section.find('.mp-section__content--inline').exists()).toBe(true)
    const inputs = section.findAll('input')
    expect(inputs).toHaveLength(2)
    await inputs[0].setValue('Alex')
    expect(inputs[0].element.value).toBe('Alex')
    page.unmount()
  })
})

it('changes visual size independently of the heading level', async () => {
  const wrapper = mount(Section, { props: { title: 'Members', headingLevel: 4 } })
  const heading = wrapper.get('h4').element
  expect(wrapper.classes()).toContain('mp-section--size-md')
  for (const size of ['xs', 'sm', 'lg', 'xl'] as const) {
    await wrapper.setProps({ size })
    expect(wrapper.classes()).toContain(`mp-section--size-${size}`)
    expect(wrapper.get('h4').element).toBe(heading)
  }
  await wrapper.setProps({ headingLevel: 2 })
  expect(wrapper.classes()).toContain('mp-section--size-xl')
  expect(wrapper.get('h2').attributes('id')).toBe(wrapper.attributes('aria-labelledby'))
  wrapper.unmount()
})

it('shows the title marker inside Form only when enabled', () => {
  const wrapper = mount(Form, {
    slots: {
      default: () => [
        h(Section, { title: 'Default marker' }),
        h(Section, { title: 'Enabled marker', showMarker: true }),
      ],
    },
  })
  const [defaultSection, markedSection] = wrapper.findAll('section')
  expect(defaultSection.classes()).toContain('mp-section--form')
  expect(markedSection.classes()).toContain('mp-section--form')
  expect(defaultSection.find('.mp-section__label--marked').exists()).toBe(false)
  expect(markedSection.find('.mp-section__label--marked').exists()).toBe(true)
  wrapper.unmount()
})
