import { createApp, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Collapse, { CollapseItem } from '..'
import { delay } from '../../utils/test'
import VarCollapse from '../Collapse'
import VarCollapseItem from '../CollapseItem.vue'

describe('test collapse and collapseItem render', () => {
  test('collapse and collapseItem use', () => {
    const app = createApp({}).use(Collapse)

    expect(app.component(Collapse.name)).toBeTruthy()
    expect(app.component(Collapse.Item.name)).toBeTruthy()
    expect(Collapse.Item).toBe(VarCollapseItem)
    expect(app.component(CollapseItem.name)).toBeTruthy()
  })
})

describe('test collapse and collapseItem props', () => {
  test('collapse accordion', async () => {
    const template = `
     <mp-collapse v-model:active-names="value" accordion>
      <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
      <mp-collapse-item title="test2" name="2">test2</mp-collapse-item>
     </mp-collapse>
    `

    const wrapper = mount({
      components: {
        [VarCollapse.name]: VarCollapse,
        [VarCollapseItem.name]: VarCollapseItem,
      },
      data() {
        return {
          value: ['2'],
        }
      },
      template,
    })

    await delay(100)
    await wrapper.find('.mp-collapse-item__header').trigger('click')
    expect(wrapper.vm.value).toStrictEqual(['1'])
  })

  test('collapse elevation', async () => {
    const elevation = ref(false)

    const template = `
     <mp-collapse v-model:active-names="value" :elevation="elevation">
      <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
      <mp-collapse-item title="test2" name="2">test2</mp-collapse-item>
     </mp-collapse>
    `

    const wrapper = mount({
      components: {
        [VarCollapse.name]: VarCollapse,
        [VarCollapseItem.name]: VarCollapseItem,
      },
      data() {
        return {
          value: ['2'],
        }
      },
      template,
      setup() {
        return {
          elevation,
        }
      },
    })

    await delay(100)
    expect(wrapper.find('.mp-collapse-item__shadow').classes()).not.toContain('mp-elevation--2')

    elevation.value = true
    await delay(100)
    expect(wrapper.find('.mp-collapse-item__shadow').classes()).toContain('mp-elevation--2')

    elevation.value = 24
    await delay(100)
    expect(wrapper.find('.mp-collapse-item__shadow').classes()).toContain('mp-elevation--24')
  })

  test('collapse offset', async () => {
    const offset = ref(false)

    const template = `
     <mp-collapse v-model:active-names="value" :offset="offset">
      <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
      <mp-collapse-item title="test2" name="2">test2</mp-collapse-item>
     </mp-collapse>
    `

    const wrapper = mount({
      components: {
        [VarCollapse.name]: VarCollapse,
        [VarCollapseItem.name]: VarCollapseItem,
      },
      data() {
        return {
          value: ['2'],
        }
      },
      template,
      setup() {
        return {
          offset,
        }
      },
    })

    expect(wrapper.find('.mp-collapse').classes()).not.toContain('mp-collapse--offset')

    const collapseItemList = wrapper.findAll('.mp-collapse-item')
    await collapseItemList[0].find('.mp-collapse-item__header').trigger('click')
    await delay(100)
    expect(collapseItemList[0].classes()).toContain('mp-collapse-item--active')

    offset.value = true
    await delay(100)
    expect(wrapper.find('.mp-collapse').classes()).toContain('mp-collapse--offset')
  })

  test('collapse bordered', () => {
    const wrapper = mount({
      components: {
        [VarCollapse.name]: VarCollapse,
        [VarCollapseItem.name]: VarCollapseItem,
      },
      template: `
        <mp-collapse>
          <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
        </mp-collapse>
      `,
    })

    expect(wrapper.find('.mp-collapse').classes()).not.toContain('mp-collapse--borderless')
    wrapper.unmount()

    const borderless = mount({
      components: {
        [VarCollapse.name]: VarCollapse,
        [VarCollapseItem.name]: VarCollapseItem,
      },
      template: `
        <mp-collapse :bordered="false">
          <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
        </mp-collapse>
      `,
    })

    expect(borderless.find('.mp-collapse').classes()).toContain('mp-collapse--borderless')
    borderless.unmount()
  })

  test('collapse divider', async () => {
    const template = `
     <mp-collapse v-model:active-names="value" :divider="divider">
      <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
      <mp-collapse-item title="test2" name="2">test2</mp-collapse-item>
     </mp-collapse>
    `
    const wrapper = mount({
      components: {
        [VarCollapse.name]: VarCollapse,
        [VarCollapseItem.name]: VarCollapseItem,
      },
      data() {
        return {
          value: [],
          divider: true,
        }
      },
      template,
    })

    await delay(100)

    expect(wrapper.find('.mp-collapse').classes()).not.toContain('mp-collapse--no-divider')

    await wrapper.setData({ divider: false })
    await delay(100)
    expect(wrapper.find('.mp-collapse').classes()).toContain('mp-collapse--no-divider')

    wrapper.unmount()
  })

  test('collapseItem title and name', async () => {
    const title = ref('test1')
    const name = ref('1')
    const template = `
      <mp-collapse v-model:active-names="value">
        <mp-collapse-item :title="title" :name="name" />
      </mp-collapse>
    `

    const wrapper = mount(
      {
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },
        data() {
          return {
            value: [],
          }
        },
        template,
        setup() {
          return {
            title,
            name,
          }
        },
      },
      { attachTo: document.body },
    )

    await delay(100)
    const collapseItemList = wrapper.findAll('.mp-collapse-item')
    await collapseItemList[0].find('.mp-collapse-item__header').trigger('click')
    expect(wrapper.vm.value).toStrictEqual(['1'])
    expect(wrapper.find('.mp-collapse-item__header').text()).toBe('test1')

    await wrapper.setData({ value: [] })
    name.value = '2'
    title.value = 'test2'
    await delay(100)
    await collapseItemList[0].find('.mp-collapse-item__header').trigger('click')
    await delay(100)
    expect(wrapper.vm.value).toStrictEqual(['2'])
    expect(wrapper.find('.mp-collapse-item__header').text()).toBe('test2')
  })

  test('collapseItem expand icon', async () => {
    const template = `
      <mp-collapse v-model:active-names="value">
        <mp-collapse-item title="test1" name="1" />
      </mp-collapse>
    `

    const wrapper = mount(
      {
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },
        data() {
          return {
            value: ['1'],
          }
        },
        template,
      },
      { attachTo: document.body },
    )

    await delay(100)
    const icon = wrapper.findComponent({ name: 'MpIcon' })
    expect(icon.exists()).toBe(true)
    expect(icon.find('svg').exists()).toBe(true)
    expect(icon.classes()).toContain('mp-collapse-item__header-open')
  })

  test('collapseItem disabled', async () => {
    const template = `
      <mp-collapse v-model:active-names="value">
        <mp-collapse-item title="test1" disabled name="1">test1</mp-collapse-item>
        <mp-collapse-item title="test2" name="2">test2</mp-collapse-item>
        <mp-collapse-item title="test3" name="3">test3</mp-collapse-item>
      </mp-collapse>
    `

    const wrapper = mount(
      {
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },
        data() {
          return {
            value: ['2'],
          }
        },
        template,
      },
      { attachTo: document.body },
    )

    await delay(100)
    const collapseItemList = wrapper.findAll('.mp-collapse-item')
    expect(collapseItemList[0].classes()).toContain('mp-collapse-item--disable')
    await collapseItemList[0].find('.mp-collapse-item__header').trigger('click')
    expect(wrapper.vm.value.toString()).toBe('2')

    wrapper.unmount()
  })
})

describe('test collapse Events', () => {
  test('collapse and collapseItem onChange', async () => {
    const template = `
    <mp-collapse v-model:active-names="value" @change="handleChange">
      <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
      <mp-collapse-item title="test2" name="2">test2</mp-collapse-item>
      <mp-collapse-item title="test3" name="3">test3</mp-collapse-item>
    </mp-collapse>
  `

    const handleChange = vi.fn()

    const wrapper = mount(
      {
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },
        data() {
          return {
            value: ['2'],
          }
        },
        methods: {
          handleChange,
        },
        template,
      },
      { attachTo: document.body },
    )

    await delay(100)

    const collapseItemList = wrapper.findAll('.mp-collapse-item')

    expect(collapseItemList[1].classes()).toContain('mp-collapse-item--active')

    const firstCollapseItemHeader = collapseItemList[0].find('.mp-collapse-item__header')
    const secondCollapseItemHeader = collapseItemList[1].find('.mp-collapse-item__header')

    expect(firstCollapseItemHeader.exists()).toBeTruthy()

    await firstCollapseItemHeader.trigger('click')

    expect(wrapper.vm.value).toEqual(['2', '1'])

    await secondCollapseItemHeader.trigger('click')

    expect(wrapper.vm.value).toEqual(['1'])

    expect(collapseItemList[0].classes()).toContain('mp-collapse-item--active')
    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  test('supports keyboard expansion with linked aria regions', async () => {
    const wrapper = mount({
      components: {
        [VarCollapse.name]: VarCollapse,
        [VarCollapseItem.name]: VarCollapseItem,
      },
      template: `
        <mp-collapse>
          <mp-collapse-item title="details" name="details">Content</mp-collapse-item>
        </mp-collapse>
      `,
    })

    const header = wrapper.get('[role="button"]')
    const panel = wrapper.get('[role="region"]')
    expect(header.attributes('aria-controls')).toBe(panel.attributes('id'))
    expect(panel.attributes('aria-labelledby')).toBe(header.attributes('id'))

    await header.trigger('keydown', { key: 'Enter' })
    expect(header.attributes('aria-expanded')).toBe('true')
  })

  describe('test collapse Methods', () => {
    test('collapse toggleAll', async () => {
      const collapseRef = ref(null)

      const template = `
      <mp-collapse v-model:active-names="value" ref="collapseRef">
        <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
        <mp-collapse-item title="test2" name="2"> test2</mp-collapse-item>
        <mp-collapse-item title="test3" disabled name="3"> test3</mp-collapse-item>
        <mp-collapse-item title="test4" disabled name="4"> test4</mp-collapse-item>
      </mp-collapse>
    `
      const wrapper = mount({
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },
        data() {
          return {
            value: ['1', '3'],
          }
        },
        template,
        setup() {
          return {
            collapseRef,
          }
        },
      })

      await wrapper.vm.$nextTick()

      collapseRef.value.toggleAll({ expand: 'inverse' })
      expect(wrapper.vm.value).toEqual(['2', '4'])

      await wrapper.setData({ value: ['1', '3'] })
      collapseRef.value.toggleAll({ expand: 'inverse', skipDisabled: true })
      expect(wrapper.vm.value).toEqual(['2', '3'])

      await wrapper.setData({ value: ['1', '3'] })
      collapseRef.value.toggleAll({ expand: true })
      expect(wrapper.vm.value).toEqual(['1', '2', '3', '4'])

      await wrapper.setData({ value: ['1', '3'] })
      collapseRef.value.toggleAll({ expand: true, skipDisabled: true })
      expect(wrapper.vm.value).toEqual(['1', '2', '3'])

      await wrapper.setData({ value: ['1', '3'] })
      collapseRef.value.toggleAll({ expand: false })
      expect(wrapper.vm.value).toEqual([])

      await wrapper.setData({ value: ['1', '3'] })
      collapseRef.value.toggleAll({ expand: false, skipDisabled: true })
      expect(wrapper.vm.value).toEqual(['3'])
    })
  })

  describe('test collapse slot', () => {
    test('collapse slot default', async () => {
      const template = `
      <mp-collapse v-model:active-names="value">
        <mp-collapse-item title="test1" name="1">test1</mp-collapse-item>
        <mp-collapse-item title="test2" name="2">test2</mp-collapse-item>
        <mp-collapse-item title="test3" name="3">test3</mp-collapse-item>
      </mp-collapse>
    `
      const wrapper = mount({
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },

        data() {
          return {
            value: ['2'],
          }
        },
        template,
      })

      await delay(100)
      expect(wrapper.findAll('.mp-collapse-item__content')[0].text()).toBe('test1')
      expect(wrapper.findAll('.mp-collapse-item__content')[1].text()).toBe('test2')
      expect(wrapper.findAll('.mp-collapse-item__content')[2].text()).toBe('test3')
    })

    test('collapse slot title', async () => {
      const template = `
      <mp-collapse v-model:active-names="value">
        <mp-collapse-item name="1">
        test1
        <template #title>title slot1</template>
        </mp-collapse-item>
        <mp-collapse-item name="1">
        test1
        <template #title>title slot2</template>
        </mp-collapse-item>
        <mp-collapse-item name="1">
        test1
        <template #title>title slot3</template>
        </mp-collapse-item>
      </mp-collapse>
    `
      const wrapper = mount({
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },
        data() {
          return {
            value: ['2'],
          }
        },
        template,
      })

      await delay(100)
      expect(wrapper.findAll('.mp-collapse-item__header')[0].text()).toBe('title slot1')
      expect(wrapper.findAll('.mp-collapse-item__header')[1].text()).toBe('title slot2')
      expect(wrapper.findAll('.mp-collapse-item__header')[2].text()).toBe('title slot3')
    })

    test('collapse slot expand-icon', async () => {
      const template = `
      <mp-collapse v-model:active-names="value">
        <mp-collapse-item name="1">
        test1
        <template #expand-icon>expand-icon slot1</template>
        </mp-collapse-item>
        <mp-collapse-item name="1">
        test1
        <template #expand-icon>expand-icon slot2</template>
        </mp-collapse-item>
        <mp-collapse-item name="1">
        test1
        <template #expand-icon>expand-icon slot3</template>
        </mp-collapse-item>
      </mp-collapse>
    `
      const wrapper = mount({
        components: {
          [VarCollapse.name]: VarCollapse,
          [VarCollapseItem.name]: VarCollapseItem,
        },
        data() {
          return {
            value: ['2'],
          }
        },
        template,
      })

      await delay(100)
      expect(wrapper.findAll('.mp-collapse-item__header')[0].text()).toBe('expand-icon slot1')
      expect(wrapper.findAll('.mp-collapse-item__header')[1].text()).toBe('expand-icon slot2')
      expect(wrapper.findAll('.mp-collapse-item__header')[2].text()).toBe('expand-icon slot3')
    })
  })
})
