import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Row from '../../row/Row.vue'
import Col from '../Col.vue'

describe('flex preserves independent column layout', () => {
  it('retains base and responsive visibility, offsets and sorting', async () => {
    const wrapper = mount(Col, {
      props: { flex: '100px', span: 0, offset: 2, order: 2, sm: { span: 12, offset: 0, order: 0 } },
    })
    const classes = wrapper.classes().map((value) => value.replace(/^(mp|c)-/, ''))
    expect(classes).toEqual(
      expect.arrayContaining([
        'col--span-0',
        'col--offset-2',
        'col--order',
        'col--span-sm-12',
        'col--offset-sm-0',
        'col--order-sm',
      ]),
    )
    expect(wrapper.element.style.flex).toBe('0 0 100px')
    expect(wrapper.element.style.width).toBe('auto')
    await wrapper.setProps({ flex: undefined })
    expect(wrapper.element.style.flex).toBe('')
    expect(wrapper.element.style.width).toBe('')
    expect(wrapper.classes().some((value) => value.endsWith('--span-0'))).toBe(true)
    wrapper.unmount()
  })
  it('div mode removes layout styles without remounting content', async () => {
    const wrapper = mount(Row, {
      props: { div: false, gutter: 12 },
      slots: {
        default: () => (
          <Col flex="100px" offset={2} order={2}>
            <input />
          </Col>
        ),
      },
    })
    const input = wrapper.find('input').element
    input.value = 'draft'
    await wrapper.setProps({ div: true })
    expect(wrapper.find('input').element).toBe(input)
    expect(input.value).toBe('draft')
    expect(wrapper.findComponent(Col).element.style.flex).toBe('')
    await wrapper.setProps({ div: false })
    expect(wrapper.find('input').element).toBe(input)
    expect(wrapper.findComponent(Col).element.style.flex).toBe('0 0 100px')
    wrapper.unmount()
  })
})
