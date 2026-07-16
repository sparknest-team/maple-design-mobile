import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { delay, mockOffset } from '../../utils/test'
import Image from '../Image.vue'
import ImagePreview from '../ImagePreview.vue'
import ImagePreviewGroup from '../ImagePreviewGroup.vue'

mockOffset({ offsetWidth: 375, offsetHeight: 815 })

describe('image preview group wrap mode', () => {
  test('registers child images and opens preview on click', async () => {
    const wrapper = mount({
      components: {
        MpImagePreviewGroup: ImagePreviewGroup,
        MpImage: Image,
      },
      template: `
        <mp-image-preview-group :teleport="null">
          <mp-image src="https://maplejs.org/cat.jpg" width="85" height="85" />
          <mp-image src="https://maplejs.org/cat2.jpg" width="85" height="85" />
        </mp-image-preview-group>
      `,
    })

    await delay(0)

    const group = wrapper.findComponent(ImagePreviewGroup)
    expect(group.exists()).toBe(true)

    const images = wrapper.findAllComponents(Image)
    expect(images.length).toBe(2)

    const previews = wrapper.findAllComponents(ImagePreview)
    expect(previews.length).toBe(1)

    const preview = previews[0]
    expect(preview.props('images')).toEqual(['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'])

    await images[1].find('img').trigger('click')
    await flushPromises()

    expect(group.vm.mergedVisible).toBe(true)
    expect(preview.props('visible')).toBe(true)
    expect(preview.props('current')).toBe(1)

    wrapper.unmount()
  })
})
