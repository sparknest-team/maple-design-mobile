import { createApp, defineComponent, h, nextTick, reactive } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Form from '..'
import Input from '../../input'
import Section from '../../section'
import FormItem from '../FormItem.vue'
import { useForm } from '../provide'

describe('Section', () => {
  it('switches styles without remounting fields', async () => {
    const wrapper = mount(Section, {
      props: { title: '现场处置' },
      slots: { default: () => h('input') },
    })
    try {
      expect(wrapper.classes()).toContain('mp-section--heading-line')
      const input = wrapper.get('input').element
      await wrapper.get('input').setValue('Draft onsite instructions')
      expect(wrapper.find('.mp-section__line').exists()).toBe(true)
      for (const variant of ['outline', 'plain', 'heading-line'] as const) {
        await wrapper.setProps({ variant })
        expect(wrapper.classes()).toContain(`mp-section--${variant}`)
        expect(wrapper.get('input').element).toBe(input)
        expect(wrapper.get('input').element.value).toBe('Draft onsite instructions')
        expect(wrapper.find('.mp-section__line').exists()).toBe(variant === 'heading-line')
      }
    } finally {
      wrapper.unmount()
    }
  })
  it('registers with Form and preserves the following ungrouped fields', async () => {
    const app = createApp({}).use(Form).use(Section)
    expect(app.component('MpSection')).toBeTruthy()
    expect(Form).not.toHaveProperty('Section')
    const sectionState = reactive({ showMarker: true })
    const wrapper = mount(Form, {
      slots: {
        default: () => [
          h(Section, { title: '现场处置', ...sectionState }, () =>
            h(FormItem, { label: '安全须知' }, () => h('input')),
          ),
          h(FormItem, { label: '技能等级' }, () => h('input')),
        ],
      },
    })
    try {
      const section = wrapper.get('section')
      expect(section.get('h3').text()).toBe('现场处置')
      expect(section.attributes('aria-labelledby')).toBe(section.get('h3').attributes('id'))
      expect(section.findAll('input')).toHaveLength(1)
      expect(section.element.nextElementSibling?.textContent).toContain('技能等级')
      sectionState.showMarker = false
      await nextTick()
      expect(section.find('.mp-section__label--marked').exists()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })

  it('shares the exact parent form context and label registry across the section', async () => {
    const contexts: unknown[] = []
    const Probe = defineComponent({
      setup() {
        contexts.push(useForm().form)
        return () => null
      },
    })
    const wrapper = mount(Form, {
      props: { layout: 'horizontal', autoLabelWidth: true },
      slots: { default: () => [h(Probe), h(Section, { title: '现场处置' }, () => h(Probe))] },
    })
    try {
      expect(contexts[0]).toBeTruthy()
      expect(contexts[1]).toBe(contexts[0])
    } finally {
      wrapper.unmount()
    }
  })

  it('inherits reactive layout, label flex, alignment and disabled state', async () => {
    const wrapper = mount(Form, {
      props: {
        model: { outside: '', inside: '' },
        layout: 'horizontal',
        labelColFlex: '128px',
        labelAlign: 'start',
        disabled: true,
        editMode: 'direct',
      },
      slots: {
        default: () => [
          h(FormItem, { field: 'outside', label: '外部字段' }, () => h(Input)),
          h(Section, { title: '现场处置' }, () => h(FormItem, { field: 'inside', label: '安全须知' }, () => h(Input))),
        ],
      },
    })
    try {
      expect(wrapper.findAll('input').every((input) => input.element.disabled)).toBe(true)
      const labels = () => wrapper.findAll('.mp-form-item__label-col')
      expect(labels()).toHaveLength(2)
      expect(labels().map((node) => node.attributes('style'))[0]).toBe(labels()[1].attributes('style'))
      expect(labels()[1].attributes('style')).toContain('128px')
      await wrapper.setProps({ labelColFlex: '150px', disabled: false })
      expect(labels()[1].attributes('style')).toContain('150px')
      expect(wrapper.findAll('input').every((input) => !input.element.disabled)).toBe(true)
      await wrapper.setProps({ layout: 'vertical' })
      expect(
        wrapper.findAllComponents(FormItem).every((item) => item.classes().includes('mp-form-item--vertical')),
      ).toBe(true)
      await wrapper.setProps({ layout: 'inline' })
      expect(wrapper.get('.mp-section__content').classes()).toContain('mp-section__content--inline')
    } finally {
      wrapper.unmount()
    }
  })

  it('keeps section fields in the parent validation, reset and submission lifecycle', async () => {
    const model = reactive({ inside: 'initial', outside: 'other' })
    const wrapper = mount(Form, {
      props: { model, editMode: 'direct' },
      slots: {
        default: () => [
          h(Section, { title: '现场处置' }, () =>
            h(
              FormItem,
              { field: 'inside', label: '安全须知', rules: [(value: unknown) => !!value || '请填写安全须知'] },
              () =>
                h(Input, {
                  modelValue: model.inside,
                  'onUpdate:modelValue': (value: string | null) => {
                    model.inside = value ?? ''
                  },
                }),
            ),
          ),
          h(FormItem, { field: 'outside', label: '技能等级' }, () => h(Input)),
        ],
      },
    })
    try {
      model.inside = ''
      await nextTick()
      expect(await wrapper.vm.validate()).toHaveProperty('inside')
      wrapper.vm.resetFields()
      await nextTick()
      expect(model.inside).toBe('initial')
      expect(await wrapper.vm.validate()).toBeUndefined()
      await wrapper.get('form').trigger('submit')
      await new Promise((resolve) => setTimeout(resolve, 0))
      expect(wrapper.emitted('submit-success')?.[0]?.[0]).toMatchObject({ inside: 'initial', outside: 'other' })
      expect(wrapper.findAll('form')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })

  it('supports header slots and unique accessible IDs in SSR', async () => {
    const html = await renderToString(
      h(
        'div',
        [1, 2].map(() =>
          h(
            Section,
            { description: '填写现场指引' },
            {
              title: () => '现场处置',
              extra: () => h('button', '引用模板'),
              default: () => h('input'),
            },
          ),
        ),
      ),
    )
    const container = document.createElement('div')
    container.innerHTML = html
    const sections = Array.from(container.querySelectorAll('section'))
    expect(sections[0].id).not.toBe(sections[1].id)
    for (const section of sections) {
      expect(section.getAttribute('aria-labelledby')).toBe(section.querySelector('h2')?.id)
      expect(section.getAttribute('aria-describedby')).toBe(section.querySelector('.mp-section__description')?.id)
      expect(section.querySelector('button')?.textContent).toBe('引用模板')
    }
  })
})
