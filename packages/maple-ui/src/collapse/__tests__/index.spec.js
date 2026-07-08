import { createApp, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Collapse from '..'
import CollapseItem from '../../collapse-item'
import VarCollapseItem from '../../collapse-item/CollapseItem'
import { delay } from '../../utils/test'
import VarCollapse from '../Collapse'

describe('test collapse and collapseItem render', () => {
  test('collapse and collapseItem use', () => {
    const app = createApp({}).use(Collapse).use(CollapseItem)

    expect(app.component(Collapse.name)).toBeTruthy()
    expect(app.component(CollapseItem.name)).toBeTruthy()
  })
})

describe('test collapse and collapseItem props', () => {
  test('collapse accordion', async () => {
    const template = `
     <mp-collapse v-model="value" accordion>
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
          value: '2',
        }
      },
      template,
    })

    await delay(100)
    await wrapper.find('.mp-collapse-item__header').trigger('click')
    expect(wrapper.vm.value).toBe('1')
  })

  test('collapse elevation', async () => {
    const elevation = ref(false)

    const template = `
     <mp-collapse v-model="value" :elevation="elevation">
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
     <mp-collapse v-model="value" :offset="offset">
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

    const collapseItemList = wrapper.findAll('.mp-collapse-item')
    await collapseItemList[0].find('.mp-collapse-item__header').trigger('click')
    await delay(100)
    expect(collapseItemList[0].classes()).not.toContain('mp-collapse-item--active')

    await wrapper.setData({ value: ['2'] })
    offset.value = true
    await delay(100)
    await collapseItemList[0].find('.mp-collapse-item__header').trigger('click')
    await delay(100)
    expect(collapseItemList[0].classes()).toContain('mp-collapse-item--active')
  })

  test('collapse divider', async () => {
    const template = `
     <mp-collapse v-model="value" :divider="divider">
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

    expect(wrapper.find('.mp-collapse-item').attributes('style')).toBe(
      '--mp-collapse-divider-top: var(--mp-collapse-border-top);',
    )

    await wrapper.setData({ divider: false })
    await delay(100)
    expect(wrapper.find('.mp-collapse-item').attributes('style')).toBe('--mp-collapse-divider-top: none;')

    wrapper.unmount()
  })

  test('collapseItem title and name', async () => {
    const title = ref('test1')
    const name = ref('1')
    const template = `
      <mp-collapse v-model="value">
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

  test('collapseItem icon', async () => {
    const template = `
      <mp-collapse v-model="value">
        <mp-collapse-item title="test1" name="1" icon="checkbox-marked-circle" />
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
    expect(wrapper.find('.mp-icon-checkbox-marked-circle').exists()).toBe(true)
  })

  test('collapseItem disabled', async () => {
    const template = `
      <mp-collapse v-model="value">
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
    <mp-collapse v-model="value" @change="handleChange">
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

  describe('test collapse Methods', () => {
    test('collapse toggleAll', async () => {
      const collapseRef = ref(null)

      const template = `
      <mp-collapse v-model="value" ref="collapseRef">
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
      <mp-collapse v-model="value">
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
      <mp-collapse v-model="value">
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

    test('collapse slot icon', async () => {
      const template = `
      <mp-collapse v-model="value">
        <mp-collapse-item name="1">
        test1
        <template #icon>icon slot1</template>
        </mp-collapse-item>
        <mp-collapse-item name="1">
        test1
        <template #icon>icon slot2</template>
        </mp-collapse-item>
        <mp-collapse-item name="1">
        test1
        <template #icon>icon slot3</template>
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
      expect(wrapper.findAll('.mp-collapse-item__header')[0].text()).toBe('icon slot1')
      expect(wrapper.findAll('.mp-collapse-item__header')[1].text()).toBe('icon slot2')
      expect(wrapper.findAll('.mp-collapse-item__header')[2].text()).toBe('icon slot3')
    })
  })
})
