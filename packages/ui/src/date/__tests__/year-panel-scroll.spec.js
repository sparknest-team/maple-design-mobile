import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import YearPanel from '../picker-panels/YearPickerPanel.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
})
const selection = (year = '') => ({
  chooseYear: year,
  chooseYears: [],
  chooseMonths: [],
  chooseDays: [],
  chooseRangeYear: [],
})
const props = (year = '2025', options = {}) => ({
  current: '2026-10-16',
  preview: '2026',
  choose: selection(year),
  componentProps: { type: 'year', showCurrent: true, ...options },
})
const global = { stubs: { MpAffix: { template: '<div><slot /></div>' }, PanelHeader: true } }
function create(options = {}, keepAlive = undefined) {
  const reads = []
  const nativeScroll = vi.fn()
  vi.stubGlobal('getComputedStyle', (e) => ({
    overflowY: e.classList.contains('year-scroll-host') ? 'auto' : 'visible',
  }))
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(200)
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(1400)
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(200)
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
    if (this.tagName === 'BUTTON') {
      reads.push(this)
    }
    const scale = options.scale ?? 1
    return {
      top: this.tagName === 'BUTTON' ? 100 + 800 * scale : 100,
      height: (this.tagName === 'BUTTON' ? 40 : 200) * scale,
    }
  })
  const original = HTMLElement.prototype.scrollIntoView
  HTMLElement.prototype.scrollIntoView = nativeScroll
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h('div', { class: options.unbounded ? '' : 'year-scroll-host' }, [
          keepAlive ? h(KeepAlive, null, { default: keepAlive }) : h(YearPanel, { ...props(), ...options.props }),
        ]),
    }),
    { global },
  )
  owners.push(wrapper)
  return {
    wrapper,
    reads,
    nativeScroll,
    cleanup: () => {
      HTMLElement.prototype.scrollIntoView = original
    },
  }
}
afterEach(() => vi.unstubAllGlobals())

describe('year panel scroll ownership', () => {
  it('centers the selected year only in its own scroll surface', async () => {
    const f = create()
    try {
      await nextTick()
      expect(f.reads[0]).toBe(f.wrapper.get('.mp-button--status-primary').element)
      expect(f.wrapper.element.scrollTop).toBe(720)
      expect(f.nativeScroll).not.toHaveBeenCalled()
    } finally {
      f.cleanup()
    }
  })
  it('uses layout pixels during a scaled dialog entry', async () => {
    const f = create({ scale: 0.25 })
    try {
      await nextTick()
      expect(f.wrapper.element.scrollTop).toBe(720)
      expect(f.nativeScroll).not.toHaveBeenCalled()
    } finally {
      f.cleanup()
    }
  })
  it('falls back to the current year', async () => {
    const f = create({ props: props('') })
    try {
      await nextTick()
      expect(f.reads[0]).toBe(f.wrapper.get('.mp-button--variant-outline').element)
    } finally {
      f.cleanup()
    }
  })
  it('does not scroll when no marker exists', async () => {
    const f = create({ props: props('', { showCurrent: false }) })
    try {
      await nextTick()
      expect(f.reads).toHaveLength(0)
      expect(f.wrapper.element.scrollTop).toBe(0)
    } finally {
      f.cleanup()
    }
  })
  it('never scrolls the document when no local scroll surface exists', async () => {
    const f = create({ unbounded: true })
    try {
      await nextTick()
      expect(f.reads).toHaveLength(0)
      expect(f.nativeScroll).not.toHaveBeenCalled()
    } finally {
      f.cleanup()
    }
  })
  it('does not replay alignment after bookkeeping or disposal', async () => {
    const f = create()
    try {
      await nextTick()
      await nextTick()
      expect(f.reads).toHaveLength(1)
      f.wrapper.unmount()
      owners.splice(owners.indexOf(f.wrapper), 1)
      await nextTick()
      expect(f.reads).toHaveLength(1)
    } finally {
      f.cleanup()
    }
  })
  it('retires pending alignment on immediate disposal', async () => {
    const f = create()
    try {
      f.wrapper.unmount()
      owners.splice(owners.indexOf(f.wrapper), 1)
      await nextTick()
      expect(f.reads).toHaveLength(0)
      expect(f.nativeScroll).not.toHaveBeenCalled()
    } finally {
      f.cleanup()
    }
  })
  it('aligns a fresh activation using the current selected node', async () => {
    const visible = ref(true),
      selected = ref('2025')
    const f = create({}, () => (visible.value ? h(YearPanel, props(selected.value)) : null))
    try {
      await nextTick()
      await nextTick()
      expect(f.reads).toHaveLength(1)
      visible.value = false
      await nextTick()
      selected.value = '2027'
      await nextTick()
      expect(f.reads).toHaveLength(1)
      visible.value = true
      await nextTick()
      await nextTick()
      expect(f.reads).toHaveLength(2)
      expect(f.reads[1].textContent.trim()).toBe('2027')
      expect(f.nativeScroll).not.toHaveBeenCalled()
    } finally {
      f.cleanup()
    }
  })
})
