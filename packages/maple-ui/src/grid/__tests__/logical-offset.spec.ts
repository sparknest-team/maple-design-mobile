import { h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Grid from '../Grid.vue'
import GridItem from '../GridItem.vue'

describe('grid logical offset and slot contract', () => {
  it.each(['ltr', 'rtl'])('keeps logical offsets independent of direction: %s', async (dir) => {
    const offset = ref(1)
    const wrapper = mount(Grid, {
      attrs: { dir },
      props: { cols: 4, colGap: 12 },
      slots: { default: () => h(GridItem, { span: 2, offset: offset.value }) },
    })
    const item = wrapper.findComponent(GridItem)
    expect(item.element.style.gridColumn).toBe('span 3 / span 3')
    expect(item.element.style.marginInlineStart).toContain('calc')
    expect(item.element.style.marginLeft).toBe('')
    offset.value = 0
    await nextTick()
    expect(item.element.style.marginInlineStart).toBe('')
    wrapper.unmount()
  })
  it('exposes parent overflow to ordinary and suffix slots', async () => {
    const wrapper = mount(Grid, {
      props: { cols: 2, collapsed: true },
      slots: {
        default: () => [
          h(
            GridItem,
            { span: 2 },
            {
              default: ({ overflow }: { overflow: boolean }) =>
                h('span', { 'data-role': 'ordinary' }, String(overflow)),
            },
          ),
          h(
            GridItem,
            { suffix: true },
            {
              default: ({ overflow }: { overflow: boolean }) => h('span', { 'data-role': 'suffix' }, String(overflow)),
            },
          ),
        ],
      },
    })
    await nextTick()
    expect(wrapper.find('[data-role="ordinary"]').text()).toBe('true')
    expect(wrapper.find('[data-role="suffix"]').text()).toBe('true')
    await wrapper.setProps({ collapsed: false })
    expect(wrapper.find('[data-role="ordinary"]').text()).toBe('false')
    expect(wrapper.find('[data-role="suffix"]').text()).toBe('false')
    wrapper.unmount()
  })
  it('renders every item before mounted collapse during SSR', async () => {
    const html = await renderToString(
      h(Grid, { cols: 1, collapsed: true }, () => ['Alpha', 'Beta'].map((text) => h(GridItem, null, () => text))),
    )
    expect(html).toContain('Alpha')
    expect(html).toContain('Beta')
    expect(html).not.toMatch(/display:\s*none/)
  })
})
