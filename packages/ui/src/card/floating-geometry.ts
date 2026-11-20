// The placeholder stays in normal flow. Its layout height excludes ancestor
// transforms, while the promoted floater animates between viewport rectangles.
export function layoutHeight(element: HTMLElement, visualHeight: number) {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element)
  if (!style?.height.endsWith('px')) {
    return element.offsetHeight || visualHeight
  }
  const height = parseFloat(style.height)
  if (style.boxSizing === 'border-box') {
    return height
  }
  return [style.paddingTop, style.paddingBottom, style.borderTopWidth, style.borderBottomWidth].reduce(
    (size, edge) => size + (parseFloat(edge) || 0),
    height,
  )
}

export function returnGeometry(holder: HTMLElement, floater: HTMLElement | null, expandedContent: HTMLElement | null) {
  const view = holder.ownerDocument.defaultView
  const width = view?.getComputedStyle(holder).width
  const previousHeight = holder.style.height
  if (!floater || !width?.endsWith('px') || !view?.CSS?.supports('max-height', 'max-content')) {
    return { rect: holder.getBoundingClientRect(), layoutHeight: previousHeight }
  }

  // Constrain intrinsic layout for one synchronous read. Width and height
  // transitions keep their current progress, and the live slot stays mounted.
  const style = floater.style
  const { minWidth, maxWidth, minHeight, maxHeight } = style
  const contentHeight = expandedContent?.style.height
  try {
    style.minWidth = style.maxWidth = width
    style.minHeight = style.maxHeight = 'max-content'
    if (expandedContent) {
      expandedContent.style.height = '0px'
    }
    const height = layoutHeight(floater, floater.offsetHeight) + 'px'
    holder.style.height = height
    return { rect: holder.getBoundingClientRect(), layoutHeight: height }
  } finally {
    Object.assign(style, { minWidth, maxWidth, minHeight, maxHeight })
    if (expandedContent) {
      expandedContent.style.height = contentHeight ?? ''
    }
    holder.style.height = previousHeight
  }
}
