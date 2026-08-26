import { defineComponent, inject, nextTick, onMounted } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { PreviewGroupInjectionKey } from '../context'
import ImagePreview from '../ImagePreview.vue'
import ImagePreviewGroup from '../ImagePreviewGroup.vue'

describe('image preview group provide/inject', () => {
  test('opens preview when child triggers group preview', async () => {
    const Child = defineComponent({
      setup() {
        const ctx = inject(PreviewGroupInjectionKey)

        onMounted(async () => {
          ctx?.registerImageUrl(0, 'https://maplejs.org/cat.jpg', true)
          ctx?.registerImageUrl(1, 'https://maplejs.org/cat2.jpg', true)
          await nextTick()
          ctx?.preview(1)
        })
      },
      template: '<div />',
    })

    const wrapper = mount({
      components: {
        MpImagePreviewGroup: ImagePreviewGroup,
        Child,
      },
      template: `
        <mp-image-preview-group :popup-container="null">
          <child />
        </mp-image-preview-group>
      `,
    })

    await flushPromises()

    const group = wrapper.findComponent(ImagePreviewGroup)
    expect(group.vm.mergedOpen).toBe(true)

    const preview = wrapper.findComponent(ImagePreview)
    expect(preview.exists()).toBe(true)
    expect(preview.props('open')).toBe(true)
    expect(preview.props('current')).toBe(1)
    expect(preview.props('images')).toEqual(['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'])

    wrapper.unmount()
  })
})
