import { h, nextTick } from 'vue'
import { IconMore } from '@maple-design/icons-vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Breadcrumb from '..'
import Tooltip from '../../tooltip'

for (const trigger of ['hover', 'click']) {
  test(`breadcrumb omitted items SVG tooltip opens with ${trigger}`, async () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const routes = ['Home', 'A', 'B', 'C', 'D', 'Post'].map((label, index) => ({ label, path: `/${index}` }))
    const wrapper = mount(Breadcrumb, {
      attachTo: root,
      props: { routes, maxCount: 3 },
      slots: {
        'more-icon': ({ omittedItems }) =>
          h(
            Tooltip,
            {
              trigger,
              mouseEnterDelay: 0,
              popupContainer: false,
              content: omittedItems.map((item) => item.label).join(' / '),
            },
            { default: () => h(IconMore, { class: 'more-reference' }) },
          ),
      },
    })
    try {
      const tooltip = wrapper.findComponent(Tooltip)
      expect(tooltip.find('[role="tooltip"]').exists()).toBe(false)
      await wrapper.get('.more-reference').trigger(trigger === 'hover' ? 'mouseenter' : 'click')
      await nextTick()
      expect(tooltip.get('[role="tooltip"]').isVisible()).toBe(true)
      expect(tooltip.get('[role="tooltip"]').text()).toBe('A / B / C')
      expect(tooltip.emitted('open')).toHaveLength(1)
    } finally {
      wrapper.unmount()
      root.remove()
    }
  })
}
