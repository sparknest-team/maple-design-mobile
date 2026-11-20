import type { TriggerReferenceAttrs } from './props'
import type { TriggerElement } from './reference'

export type ReferenceBaseline = Map<string, { original: string | null; rendered: string }>

type AttributeState = { original: string | null; rendered: string | null; values: Map<symbol, string> }
type Ownership = {
  update(owner: symbol, attrs: TriggerReferenceAttrs, baseline?: ReferenceBaseline): void
  authored(name: string, value: string | null): void
}

// The attributes collection stays with the element across document adoption and
// custom-element upgrades. Independent library copies can share its active owners.
const key = Symbol.for('design-ui.trigger.reference-attributes.v1')
type AttributeCollection = NamedNodeMap & { [key]?: Ownership }
const local = new WeakMap<TriggerElement, Ownership>()

export function referenceValue(name: string, values: string[], original: string | null) {
  if (!values.length) {
    return original
  }
  return name === 'aria-describedby'
    ? [
        ...new Set(
          [original ?? '', ...values]
            .join(' ')
            .split(/[ \t\n\f\r]+/)
            .filter(Boolean),
        ),
      ].join(' ')
    : values[values.length - 1]
}

export function referenceOwnership(target: TriggerElement): Ownership {
  const collection = target.attributes as AttributeCollection
  const existing = collection[key] ?? local.get(target)
  if (existing) {
    return existing
  }

  const entries = new Map<string, AttributeState>()
  const Observer = target.ownerDocument.defaultView?.MutationObserver ?? globalThis.MutationObserver
  const observer = Observer
    ? new Observer((records) => {
        if (acceptChanges(records)) {
          apply()
        }
      })
    : undefined

  function acceptChanges(records: MutationRecord[]) {
    let changed = false
    for (const record of records) {
      const name = record.attributeName
      const entry = name && entries.get(name)
      if (entry && name) {
        entry.original = target.getAttribute(name)
        changed = true
      }
    }
    return changed
  }

  function apply() {
    // A custom element can change another attribute synchronously inside its
    // attributeChangedCallback. Consume our own record separately from its writes.
    for (let pass = 0; pass < 2; pass++) {
      let changed = false
      for (const [name, entry] of entries) {
        const value = referenceValue(name, [...entry.values.values()], entry.original)
        entry.rendered = value
        const previous = target.getAttribute(name)
        if (previous !== value) {
          if (value === null) {
            target.removeAttribute(name)
          } else {
            target.setAttribute(name, value)
          }
          const records = observer?.takeRecords() ?? []
          if (records[0]?.attributeName === name && records[0].oldValue === previous) {
            records.shift()
          }
          changed = acceptChanges(records) || changed
        }
        if (!entry.values.size) {
          entries.delete(name)
        }
      }
      if (!changed) {
        break
      }
    }
  }

  const state: Ownership = {
    update(owner, attrs, baseline) {
      acceptChanges(observer?.takeRecords() ?? [])
      for (const [name, entry] of entries) {
        if (!observer) {
          const current = target.getAttribute(name)
          if (current !== entry.rendered) {
            entry.original = current
          }
        }
        if (!Object.prototype.hasOwnProperty.call(attrs, name) || attrs[name] == null) {
          entry.values.delete(owner)
        }
      }
      for (const [name, value] of Object.entries(attrs)) {
        if (value == null) {
          continue
        }
        let entry = entries.get(name)
        if (!entry) {
          const current = target.getAttribute(name)
          const initial = baseline?.get(name)
          entry = {
            original: initial && initial.rendered === current ? initial.original : current,
            rendered: current,
            values: new Map(),
          }
          entries.set(name, entry)
        }
        entry.values.set(owner, String(value))
      }
      apply()
      if (!entries.size) {
        observer?.disconnect()
        if (collection[key] === state) {
          delete collection[key]
        }
        local.delete(target)
      }
    },
    authored(name, value) {
      acceptChanges(observer?.takeRecords() ?? [])
      const entry = entries.get(name)
      if (entry) {
        entry.original = value
        apply()
      }
    },
  }
  if (Object.isExtensible(collection)) {
    Object.defineProperty(collection, key, { configurable: true, value: state })
  } else {
    local.set(target, state)
  }
  observer?.observe(target, { attributes: true, attributeOldValue: true })
  return state
}
