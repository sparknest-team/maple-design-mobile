// Recognized concrete ARIA, Digital Publishing and Graphics roles stop fallback.
// Unknown or abstract roles are skipped; keep this list aligned with browser support.
const CONCRETE_ROLES = new Set(
  'alert alertdialog application article banner blockquote button caption cell checkbox code columnheader combobox comment complementary contentinfo definition deletion directory document emphasis feed figure form generic grid gridcell group heading image img insertion link list listbox listitem log main mark marquee math menu menubar menuitem menuitemcheckbox menuitemradio meter navigation none note option paragraph presentation progressbar radio radiogroup region row rowgroup rowheader scrollbar search searchbox sectionfooter sectionheader separator slider spinbutton status strong suggestion subscript superscript switch tab table tablist tabpanel term textbox time timer toolbar tooltip tree treegrid treeitem doc-abstract doc-acknowledgments doc-afterword doc-appendix doc-backlink doc-biblioentry doc-bibliography doc-biblioref doc-chapter doc-colophon doc-conclusion doc-cover doc-credit doc-credits doc-dedication doc-endnote doc-endnotes doc-epigraph doc-epilogue doc-errata doc-example doc-footnote doc-foreword doc-glossary doc-glossref doc-index doc-introduction doc-noteref doc-notice doc-pagebreak doc-pagefooter doc-pageheader doc-pagelist doc-part doc-preface doc-prologue doc-pullquote doc-qna doc-subtitle doc-tip doc-toc graphics-document graphics-object graphics-symbol'.split(
    ' ',
  ),
)

/** Resolve the first recognized role using ASCII whitespace and case folding. */
export function resolveConcreteAriaRole(value: string | null): string | undefined {
  return value
    ?.split(/[ \t\n\f\r]+/)
    .map((role) => role.replace(/[A-Z]/g, (letter) => letter.toLowerCase()))
    .find((role) => CONCRETE_ROLES.has(role))
}

// Widget and composite roles own interactions inside their subtree.
export const interactiveAriaRoles: ReadonlySet<string> = new Set(
  'button link checkbox radio switch textbox searchbox combobox listbox slider spinbutton scrollbar menu menubar menuitem menuitemcheckbox menuitemradio option tree treegrid treeitem grid gridcell radiogroup tab tablist'.split(
    ' ',
  ),
)

export function isInteractiveAriaRole(value: string | null): boolean {
  const role = resolveConcreteAriaRole(value)
  return role !== undefined && interactiveAriaRoles.has(role)
}
