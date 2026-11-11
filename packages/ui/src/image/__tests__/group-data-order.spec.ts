import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Image, { ImagePreviewGroup } from '..'
import { useImagePreviewGroupState } from '../composables/useImagePreviewGroup'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.innerHTML = ''
})

test('explicit empty data stays empty and child registrations survive mode switches', async () => {
  const images = ref<string[] | undefined>(undefined)
  const group = useImagePreviewGroupState({ images })
  group.registerImageUrl(9, 'child', true)
  expect(group.previewImages.value).toEqual(['child'])
  images.value = ['a', 'b']
  await nextTick()
  group.mergedCurrent.value = 1
  images.value = ['a']
  await nextTick()
  expect(group.mergedCurrent.value).toBe(0)
  images.value = []
  await nextTick()
  expect(group.previewImages.value).toEqual([])
  images.value = undefined
  await nextTick()
  expect(group.previewImages.value).toEqual(['child'])
})

test('controlled out-of-range index renders safely and proposes a valid index', async () => {
  const images = ref(['a', 'b'])
  const model = ref<number | undefined>(2)
  const change = vi.fn()
  const group = useImagePreviewGroupState({ images, modelValue: model, onCurrentChange: change })
  images.value.splice(1, 1)
  await nextTick()
  expect(group.mergedCurrent.value).toBe(0)
  expect(change).toHaveBeenCalledWith(1)
  expect(model.value).toBe(2)
})

test('child address changes and keyed reordering retain the selected image identity', async () => {
  const children = ref([
    { id: 1, src: 'a.jpg' },
    { id: 2, src: 'b.jpg' },
  ])
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h(ImagePreviewGroup, { popupContainer: false }, () =>
          children.value.map((item) => h(Image, { key: item.id, src: item.src })),
        ),
    }),
    { attachTo: document.body },
  )
  owners.push(owner)
  await nextTick()
  const group = owner.findComponent(ImagePreviewGroup)
  expect((group.vm as any).previewImages).toEqual(['a.jpg', 'b.jpg'])
  await owner.findAllComponents(Image)[0].find('img').trigger('click')
  expect((group.vm as any).mergedCurrent).toBe(0)
  children.value = [
    { id: 2, src: 'b.jpg' },
    { id: 1, src: 'new-a.jpg' },
  ]
  await nextTick()
  await nextTick()
  expect((group.vm as any).previewImages).toEqual(['b.jpg', 'new-a.jpg'])
  expect((group.vm as any).mergedCurrent).toBe(1)
})

test('controlled reorder requests the selected item’s new index without mutating the parent', async () => {
  const parent = document.createElement('div')
  const a = document.createElement('div'),
    b = document.createElement('div')
  parent.append(a, b)
  document.body.append(parent)
  const model = ref<number | undefined>(1)
  const change = vi.fn()
  const group = useImagePreviewGroupState({ modelValue: model, onCurrentChange: change })
  group.registerImageUrl(1, 'a', true, () => a)
  group.registerImageUrl(2, 'b', true, () => b)
  await nextTick()
  parent.prepend(b)
  group.refreshOrder()
  await nextTick()
  expect(group.previewImages.value).toEqual(['b', 'a'])
  expect(change).toHaveBeenCalledTimes(1)
  expect(change).toHaveBeenCalledWith(2)
  expect(model.value).toBe(1)
  model.value = 2
  await nextTick()
  expect(group.mergedCurrent.value).toBe(1)
})
