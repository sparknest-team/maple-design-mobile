/** Native labels do not activate ARIA sliders, which are not labelable elements. */
export function focusExplicitSlider(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) {
    return
  }
  const label = event.currentTarget as HTMLElement | null
  if (!label || label.nodeType !== 1 || label.tagName !== 'LABEL') {
    return
  }
  const origin = event.target as Element | null
  const interactive =
    origin?.nodeType === 1
      ? origin.closest(
          'a[href],button,input,select,textarea,[contenteditable]:not([contenteditable="false"]),[role="button"],[role="link"],[role="checkbox"],[role="radio"],[role="switch"],[role="textbox"],[role="combobox"],[role="slider"]',
        )
      : null
  if (interactive && interactive !== label && label.contains(interactive)) {
    return
  }
  const id = label.getAttribute('for')
  if (!id || (label as HTMLLabelElement).control) {
    return
  }
  const root = label.getRootNode() as Document | ShadowRoot
  if (typeof root.getElementById !== 'function') {
    return
  }
  const target = root.getElementById(id)
  if (!target) {
    return
  }
  const previous = root.activeElement
  const previousDocument = label.ownerDocument.activeElement
  // Native label activation happens after propagation: honor ancestor cancellation
  // and do not override focus that an event handler moved in the meantime.
  setTimeout(() => {
    if (
      event.defaultPrevented ||
      !label.isConnected ||
      label.getAttribute('for') !== id ||
      root.getElementById(id) !== target ||
      root.activeElement !== previous ||
      label.ownerDocument.activeElement !== previousDocument
    ) {
      return
    }
    const sliders = target.matches('[role="slider"]')
      ? [target]
      : Array.from(target.querySelectorAll('[role="slider"]'))
    if (sliders.length !== 1) {
      return
    }
    const slider = sliders[0] as HTMLElement
    if (
      target !== slider &&
      !Array.from(target.classList).some(
        (name) => name.endsWith('-slider') && slider.classList.contains(`${name}__thumb`),
      )
    ) {
      return
    }
    if (
      slider.tabIndex < 0 ||
      slider.getAttribute('aria-disabled') === 'true' ||
      slider.closest('[inert], [aria-hidden="true"]')
    ) {
      return
    }
    slider.focus()
  }, 0)
}
