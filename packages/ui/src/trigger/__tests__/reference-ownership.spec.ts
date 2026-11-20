import { nextTick } from 'vue'
import { expect, it, vi } from 'vitest'
import { referenceOwnership } from '../reference-ownership'

function manage(target: HTMLElement, attrs: Record<string, string>) {
  const state = referenceOwnership(target)
  const owner = Symbol('trigger-reference-owner')
  state.update(owner, attrs)
  return () => state.update(owner, {})
}

it('does not mistake its own A-B-A writes for a caller claiming the value', async () => {
  const target = document.createElement('button')
  target.setAttribute('aria-describedby', 'caller')
  document.body.append(target)
  try {
    const releaseOne = manage(target, { 'aria-describedby': 'one' })
    const releaseTwo = manage(target, { 'aria-describedby': 'two' })
    releaseTwo()
    await nextTick()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('caller one')
    releaseOne()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('caller')
  } finally {
    target.remove()
  }
})

it('preserves synchronous custom-element changes during a managed write', async () => {
  const name = `audit-ref-${Math.random().toString(36).slice(2)}`
  class AuditReference extends HTMLElement {
    static observedAttributes = ['aria-describedby']
    attributeChangedCallback(_name: string, _old: string | null, value: string | null) {
      if (value === 'caller auto') {
        this.setAttribute('aria-describedby', 'business')
      }
    }
  }
  customElements.define(name, AuditReference)
  const target = document.createElement(name)
  target.setAttribute('aria-describedby', 'caller')
  document.body.append(target)
  try {
    const release = manage(target, { 'aria-describedby': 'auto' })
    await nextTick()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('business auto')
    release()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('business')
  } finally {
    target.remove()
  }
})

it('preserves a second managed attribute modified synchronously by the first', async () => {
  const name = `audit-multi-${Math.random().toString(36).slice(2)}`
  class MultiReference extends HTMLElement {
    static observedAttributes = ['aria-describedby']
    attributeChangedCallback(_name: string, _old: string | null, value: string | null) {
      if (value === 'caller auto') {
        this.setAttribute('aria-label', 'business-on-open')
      }
      if (value === 'caller') {
        this.setAttribute('aria-label', 'business-on-close')
      }
    }
  }
  customElements.define(name, MultiReference)
  const target = document.createElement(name)
  target.setAttribute('aria-describedby', 'caller')
  target.setAttribute('aria-label', 'caller-label')
  document.body.append(target)
  try {
    const release = manage(target, { 'aria-describedby': 'auto', 'aria-label': 'managed-label' })
    await nextTick()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('caller auto')
    expect(target.getAttribute('aria-label')).toBe('managed-label')
    release()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('caller')
    expect(target.getAttribute('aria-label')).toBe('business-on-close')
  } finally {
    target.remove()
  }
})

it('reapplies another owner after synchronous changes during release', async () => {
  const name = `audit-release-${Math.random().toString(36).slice(2)}`
  class MultiReference extends HTMLElement {
    static observedAttributes = ['aria-describedby']
    attributeChangedCallback(_name: string, old: string | null, value: string | null) {
      if (old === 'caller auto' && value === 'caller') {
        this.setAttribute('aria-label', 'business-on-close')
      }
    }
  }
  customElements.define(name, MultiReference)
  const target = document.createElement(name)
  target.setAttribute('aria-describedby', 'caller')
  target.setAttribute('aria-label', 'caller-label')
  document.body.append(target)
  try {
    const releaseOne = manage(target, { 'aria-label': 'one', 'aria-describedby': 'auto' })
    const releaseTwo = manage(target, { 'aria-label': 'two' })
    await nextTick()
    await nextTick()
    expect(target.getAttribute('aria-label')).toBe('two')
    releaseOne()
    await nextTick()
    await nextTick()
    expect(target.getAttribute('aria-label')).toBe('two')
    releaseTwo()
    await nextTick()
    expect(target.getAttribute('aria-label')).toBe('business-on-close')
  } finally {
    target.remove()
  }
})

it('bounds retries if a custom element always rejects the managed value', async () => {
  const name = `audit-hostile-${Math.random().toString(36).slice(2)}`
  let calls = 0
  class HostileReference extends HTMLElement {
    static observedAttributes = ['aria-describedby']
    attributeChangedCallback(_name: string, _old: string | null, value: string | null) {
      calls++
      if (value?.includes('auto')) {
        this.setAttribute('aria-describedby', 'business')
      }
    }
  }
  customElements.define(name, HostileReference)
  const target = document.createElement(name)
  target.setAttribute('aria-describedby', 'caller')
  document.body.append(target)
  try {
    const release = manage(target, { 'aria-describedby': 'auto' })
    await nextTick()
    await nextTick()
    expect(calls).toBeLessThanOrEqual(6)
    expect(target.getAttribute('aria-describedby')).toBe('business')
    release()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('business')
  } finally {
    target.remove()
  }
})

it('restores a newer external value when the document has no observer', () => {
  const doc = document.implementation.createHTMLDocument('detached')
  const target = doc.createElement('button')
  const previous = globalThis.MutationObserver
  vi.stubGlobal('MutationObserver', undefined)
  try {
    target.setAttribute('aria-label', 'initial')
    const release = manage(target, { 'aria-label': 'from-trigger' })
    target.setAttribute('aria-label', 'latest')
    release()
    expect(target.getAttribute('aria-label')).toBe('latest')
  } finally {
    vi.stubGlobal('MutationObserver', previous)
  }
})
