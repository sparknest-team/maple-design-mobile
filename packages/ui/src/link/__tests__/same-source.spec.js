import { createSSRApp, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Link, { linkProps } from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('link')

describe('Link copied contract', () => {
  it('retains all size, status and underline diagnostics in development', () => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      expect(linkProps.size.validator(size)).toBe(true)
    }
    expect(linkProps.size.validator('unknown')).toBe(false)
    for (const status of ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']) {
      expect(linkProps.status.validator(status)).toBe(true)
    }
    expect(linkProps.status.validator('unknown')).toBe(false)
    for (const underline of ['none', 'hover', 'always']) {
      expect(linkProps.underline.validator(underline)).toBe(true)
    }
    expect(linkProps.underline.validator('unknown')).toBe(false)
  })
  it('keeps native link semantics while resizing text and icon states', async () => {
    const w = mount(Link, { props: { href: '/path', icon: true }, slots: { default: 'Link' } })
    expect(w.classes()).toContain(n('--size-md'))
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      await w.setProps({ size, loading: false })
      expect(w.classes()).toContain(n('--size-' + size))
      expect(w.attributes('size')).toBeUndefined()
      expect(w.attributes('href')).toBe('/path')
      expect(
        w
          .get('.' + n('icon'))
          .find('svg')
          .exists(),
      ).toBe(true)
      await w.setProps({ loading: true })
      expect(w.classes()).toContain(n('--size-' + size))
      expect(w.find('.' + n('spinner')).exists()).toBe(true)
      expect(w.attributes('href')).toBeUndefined()
      expect(w.text()).toBe('Link')
    }
    w.unmount()
  })

  it('renders an SSR native anchor', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Link, { href: '/path' }, () => 'Link') }))
    expect(html).toContain('<a')
    expect(html).toContain('href="/path"')
    expect(html.replace(/<!--.*?-->/g, '')).toContain('Link</a>')
  })
  it('forwards native attrs, styles, class and the original MouseEvent once', () => {
    const onClick = vi.fn()
    const w = mount(Link, {
      props: { href: '#path', target: '_blank', rel: 'noopener', onClick },
      attrs: { tabindex: 2, class: 'custom', style: { color: 'red' }, 'aria-label': 'Navigate' },
    })
    expect(w.attributes()).toMatchObject({
      href: '#path',
      target: '_blank',
      rel: 'noopener',
      tabindex: '2',
      'aria-label': 'Navigate',
    })
    expect(w.classes()).toContain('custom')
    expect(w.element.style.color).toBe('red')
    const event = new MouseEvent('click', { cancelable: true })
    w.element.dispatchEvent(event)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(event)
    expect(event.defaultPrevented).toBe(false)
    w.unmount()
  })
  it.each(['disabled', 'loading'])(
    'blocks %s and restores navigation without mutating other instances',
    async (state) => {
      const a = mount(Link, {
        props: { href: '#path', target: '_blank', rel: 'noopener', [state]: true },
        attrs: { tabindex: 0, 'aria-disabled': false },
      })
      const b = mount(Link, { props: { href: '#other' } })
      expect(a.attributes('href')).toBeUndefined()
      expect(a.attributes('target')).toBeUndefined()
      expect(a.attributes('rel')).toBeUndefined()
      expect(a.attributes('tabindex')).toBe('-1')
      expect(a.attributes('aria-disabled')).toBe('true')
      expect(a.attributes('aria-busy')).toBe(state === 'loading' ? 'true' : undefined)
      const event = new MouseEvent('click', { cancelable: true })
      a.element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
      expect(a.emitted('click')).toBeUndefined()
      await b.trigger('click')
      expect(b.emitted('click')).toHaveLength(1)
      await a.setProps({ [state]: false })
      expect(a.attributes('href')).toBe('#path')
      expect(a.attributes('tabindex')).toBe('0')
      expect(a.attributes('aria-disabled')).toBeUndefined()
      a.unmount()
      b.unmount()
    },
  )
  it('supports every semantic status, underline and hoverable independently', async () => {
    const w = mount(Link)
    expect(w.classes()).toContain(n('--hoverless'))
    for (const status of ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']) {
      await w.setProps({ status })
      expect(w.classes()).toContain(n('--status-' + status))
    }
    for (const underline of ['none', 'hover', 'always']) {
      await w.setProps({ underline, hoverable: true })
      expect(w.classes()).toContain(n('--underline-' + underline))
      expect(w.classes()).not.toContain(n('--hoverless'))
    }
    w.unmount()
  })
  it('updates conditional icon slots and gives loading priority', async () => {
    const show = ref(false)
    const loading = ref(false)
    const w = mount({
      setup: () => () =>
        h(
          Link,
          { loading: loading.value },
          { default: () => 'Text', ...(show.value ? { icon: () => h('b', { class: 'custom-icon' }, 'Icon') } : {}) },
        ),
    })
    expect(w.find('.' + n('icon')).exists()).toBe(false)
    show.value = true
    await nextTick()
    expect(w.find('.custom-icon').exists()).toBe(true)
    loading.value = true
    await nextTick()
    expect(w.find('.custom-icon').exists()).toBe(false)
    expect(w.find('.' + n('spinner')).exists()).toBe(true)
    expect(w.find('.' + n('icon')).attributes('aria-hidden')).toBe('true')
    loading.value = false
    show.value = false
    await nextTick()
    expect(w.find('.' + n('icon')).exists()).toBe(false)
    w.unmount()
  })
  it('renders the default icon without requiring a slot', () => {
    const w = mount(Link, { props: { icon: true } })
    expect(w.find('.' + n('icon') + ' svg').exists()).toBe(true)
    w.unmount()
  })
})
