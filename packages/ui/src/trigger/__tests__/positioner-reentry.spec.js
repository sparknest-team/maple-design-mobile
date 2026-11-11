import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useTriggerPositioner } from '../positioner'

test('closing during reference measurement does not publish popup geometry', () => {
  const reference = document.createElement('button')
  const popup = document.createElement('div')
  document.body.append(reference, popup)
  const visible = ref(false)
  let api
  const wrapper = mount({
    setup() {
      api = useTriggerPositioner(
        {
          placement: 'bottom',
          strategy: 'fixed',
          cover: false,
          popupOffset: 8,
          showArrow: false,
          autoFitPopupWidth: false,
          autoFitPopupMinWidth: false,
          autoFitPosition: false,
          autoFitTransformOrigin: false,
          autoFixPosition: false,
          updateAtScroll: false,
          scrollToClose: false,
          scrollToCloseDistance: 5,
        },
        {
          reference: ref(reference),
          popup: ref(popup),
          visible,
          point: ref(),
          globalUpdateAtScroll: ref(false),
          globalScrollToClose: ref(false),
          requestClose() {},
          referenceResize() {},
        },
      )
      return () => h('div')
    },
  })
  try {
    visible.value = true
    vi.spyOn(reference, 'getBoundingClientRect').mockImplementation(() => {
      visible.value = false
      return { top: 100, bottom: 140, left: 20, right: 100, width: 80, height: 40 }
    })
    api.update()
    expect(api.referenceSize.value).toEqual({ width: 0, height: 0 })
    expect(api.popupStyle.value).toEqual({})
  } finally {
    wrapper.unmount()
    reference.remove()
    popup.remove()
    vi.restoreAllMocks()
  }
})

test('a newer reentrant update owns popup geometry', () => {
  const reference = document.createElement('button')
  const popup = document.createElement('div')
  document.body.append(reference, popup)
  const visible = ref(false)
  let api
  const wrapper = mount({
    setup() {
      api = useTriggerPositioner(
        {
          placement: 'bottom',
          strategy: 'fixed',
          cover: false,
          popupOffset: 8,
          showArrow: false,
          autoFitPopupWidth: false,
          autoFitPopupMinWidth: false,
          autoFitPosition: false,
          autoFitTransformOrigin: false,
          autoFixPosition: false,
          updateAtScroll: false,
          scrollToClose: false,
          scrollToCloseDistance: 5,
        },
        {
          reference: ref(reference),
          popup: ref(popup),
          visible,
          point: ref(),
          globalUpdateAtScroll: ref(false),
          globalScrollToClose: ref(false),
          requestClose() {},
          referenceResize() {},
        },
      )
      return () => h('div')
    },
  })
  try {
    visible.value = true
    let nested = false
    vi.spyOn(reference, 'getBoundingClientRect').mockImplementation(() => {
      if (!nested) {
        nested = true
        api.update()
        return { top: 0, bottom: 10, left: 0, right: 10, width: 10, height: 10 }
      }
      return { top: 20, bottom: 60, left: 0, right: 80, width: 80, height: 40 }
    })
    api.update()
    expect(api.referenceSize.value).toEqual({ width: 80, height: 40 })
  } finally {
    wrapper.unmount()
    reference.remove()
    popup.remove()
    vi.restoreAllMocks()
  }
})

test('superseded arrow calculation cannot restore an obsolete arrow', async () => {
  const reference = document.createElement('button')
  const popup = document.createElement('div')
  document.body.append(reference, popup)
  const visible = ref(false)
  const options = {
    placement: 'bottom',
    strategy: 'fixed',
    cover: false,
    popupOffset: 8,
    showArrow: true,
    autoFitPopupWidth: false,
    autoFitPopupMinWidth: false,
    autoFitPosition: false,
    autoFitTransformOrigin: false,
    autoFixPosition: false,
    updateAtScroll: false,
    scrollToClose: false,
    scrollToCloseDistance: 5,
  }
  let api
  const wrapper = mount({
    setup() {
      api = useTriggerPositioner(options, {
        reference: ref(reference),
        popup: ref(popup),
        visible,
        point: ref(),
        globalUpdateAtScroll: ref(false),
        globalScrollToClose: ref(false),
        requestClose() {},
        referenceResize() {},
      })
      return () => h('div')
    },
  })
  try {
    visible.value = true
    api.update()
    options.showArrow = false
    api.update()
    await nextTick()
    expect(api.arrowStyle.value).toEqual({})
  } finally {
    wrapper.unmount()
    reference.remove()
    popup.remove()
    vi.restoreAllMocks()
  }
})
