// Browsers return a matrix for computed transforms. jsdom preserves the translateY function.
export function setRenderedTranslations(root) {
  for (const scroller of root.querySelectorAll('.mp-picker__scroller')) {
    const translation = /^translateY\((-?[\d.]+)px\)$/.exec(scroller.style.transform)
    if (translation) {
      scroller.style.transform = `matrix(1, 0, 0, 1, 0, ${translation[1]})`
    }
  }
}
