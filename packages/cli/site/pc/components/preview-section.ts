// Resolve from live geometry instead of the debounced URL hash, so switching
// immediately after a scroll still selects the chapter currently being read.
export function currentMobileDemo(root?: HTMLElement | null): string | undefined {
  const headings = Array.from(
    root?.querySelectorAll<HTMLElement>('.maple-site-doc h2, .maple-site-doc h3') ?? [],
  ).filter((heading) => !heading.closest('.loca-doc-preview__example, details'))
  let active = headings[0]
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > 120) break
    active = heading
  }
  if (!active) return
  const card = active.closest('.card')
  if (card) return card.querySelector<HTMLElement>('[data-mobile-demo]')?.dataset.mobileDemo
  // A group heading selects its first demo; never cross into the next group.
  let sibling: Element | null = active
  while (sibling) {
    if (sibling !== active && sibling.matches('h2')) break
    const demo = sibling.querySelector<HTMLElement>('[data-mobile-demo]')
    if (demo) return demo.dataset.mobileDemo
    sibling = sibling.nextElementSibling
  }
}
