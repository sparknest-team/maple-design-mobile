# Theme token contract

Maple and Cedar use the same token model. Only the namespace (`mp` / `c`) and
platform defaults may differ.

## Layers

1. `ref`: raw palette and dimension values. Component styles must not consume
   this layer directly.
2. `sys`: stable product semantics such as `color-content-primary` and
   `control-height-md`. Brand, color-mode and density themes override this
   layer first.
3. Component: stable customization points using
   `--{namespace}-{component}-{part}-{property}-{state?}`.
4. `internal`: measurements and implementation details. These are not public
   API and must not appear in component documentation or theme packages.

## Rules

- A Maple and Cedar component with the same name exposes the same public token
  suffixes with the same meaning.
- Use full semantic words: `background`, `horizontal`, `disabled`; do not use
  `bg`, `x`, or `disable` in new public names.
- State is the final segment: `item-background-selected`.
- Size starts with `size-{xs|sm|md|lg|xl}`.
- Component defaults reference `sys` tokens. A literal is allowed only for a
  component-specific geometry that has no reusable semantic role.
- Platform differences belong in token values, never in token names.
- New or renamed contracts must be added to the cross-repository checker in
  `checks/style-vars-contract.mjs`.

Run `pnpm check:style-vars` before submitting changes.

## Semantic content colors

Colored content uses the corresponding action or status color by default.
`content-brand` follows `action-primary`; `content-info`, `content-success`,
`content-warning` and `content-danger` follow their `status-*` roles. Button
text, outline and tonal foregrounds follow the matching solid fill. Named Tag
colors use palette step 6. Neutral body text and disabled text keep their own roles.
