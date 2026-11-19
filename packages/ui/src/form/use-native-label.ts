import { ref, watch, type Ref } from 'vue'

import { interactiveAriaRoles, resolveConcreteAriaRole } from '../_utils/aria-role'
import { createNamespace } from '../utils/components'

const clearClass = createNamespace('field-decorator').n('clear-btn')
const editorMarker = '[data-form-editor-id],[data-form-composite]'
const nativeControls = 'input:not([type=hidden i]),textarea,select,button,a[href],fieldset,[contenteditable]:not([contenteditable=false i]),[tabindex]:not([tabindex="-1"])'

function isEditor(node: Element) {
  return node.matches('textarea,select') || (
    node.tagName === 'INPUT' && !/^(hidden|button|submit|reset|image|file|checkbox|radio)$/.test((node as HTMLInputElement).type)
  )
}

export function useNativeLabel(content: Ref<HTMLElement | undefined>, group: Ref<boolean>, itemSelector: string, labelId: () => string | undefined) {
  const boundary = 'form,' + itemSelector
  const controlsSelector = [nativeControls, editorMarker, boundary].join(',')
  const hidden = '[hidden],[inert],[aria-hidden=true]'
  const candidates = [controlsSelector, hidden, '[style],[role]'].join(',')
  const target = ref<string>()
  watch([content, labelId], ([element, id], _, cleanup) => {
    target.value = undefined
    group.value = false
    if (!element || !id) return

    const generated = id + '-control'
    let assigned: Element | undefined
    const release = () => {
      if (assigned?.id === generated) assigned.removeAttribute('id')
      assigned = undefined
    }
    const update = () => {
      // In document order, descendants of a widget belong to that widget.
      // Structural roles such as region and heading leave their contents visible.
      let owner: Element | undefined
      const controls = Array.from(element.querySelectorAll(candidates)).filter(node => {
        if (owner?.contains(node)) return false
        if (node.matches(hidden) || (node as HTMLElement).style?.display === 'none' || node.matches(boundary)) {
          owner = node
          return false
        }
        if (!node.matches(controlsSelector)) {
          const role = resolveConcreteAriaRole(node.getAttribute('role'))
          if (role !== 'group' && role !== 'form' && role !== 'toolbar' && !interactiveAriaRoles.has(role ?? '')) return false
        }
        owner = node
        return !node.classList.contains(clearClass) && !node.hasAttribute('data-field-open-trigger')
      })
      const node = controls.length === 1 ? controls[0] : undefined
      const field = node && isEditor(node) ? node : undefined
      if (assigned && (assigned !== field || assigned.id !== generated)) release()
      group.value = controls.length > 1 && controls.some(control => isEditor(control) || control.matches(editorMarker + ',input[type=radio i],input[type=checkbox i]'))
      target.value = node?.getAttribute('data-form-editor-id') || undefined
      if (!field) return
      const root = field.getRootNode() as Document | ShadowRoot
      // A Vue app may mount into a detached element before it is inserted.
      const findId = (value: string) => typeof root.getElementById === 'function'
        ? root.getElementById(value)
        : Array.from(root.querySelectorAll('[id]')).find(item => item.id === value)
      if (!field.hasAttribute('id')) {
        if (findId(generated)) return
        assigned = field
        field.id = generated
      }
      if (field.id && findId(field.id) === field) target.value = field.id
    }
    update()
    const Observer = element.ownerDocument.defaultView?.MutationObserver
    const observer = Observer && new Observer(update)
    observer?.observe(element, { childList: true, subtree: true, attributes: true,
      attributeFilter: ['id', 'type', 'role', 'tabindex', 'href', 'style', 'hidden', 'inert', 'aria-hidden', 'contenteditable', 'data-form-editor-id', 'data-form-composite', 'data-field-open-trigger'] })
    cleanup(() => { observer?.disconnect(); release() })
  }, { flush: 'post', immediate: true })
  return target
}
