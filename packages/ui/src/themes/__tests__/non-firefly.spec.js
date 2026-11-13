import { createHash } from 'node:crypto'
import { expect, test } from 'vitest'
import Themes from '..'

test('non-Firefly theme palettes preserve the current semantic token contract', () => {
  const hashes = {}
  expect(Themes.maple.light['--mp-switch-checked-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
  expect(Themes.maple.light).not.toHaveProperty('--mp-internal-switch-checked-text-color')
  for (const brand of ['default', 'maple', 'alps']) {
    for (const mode of ['light', 'dark']) {
      // Normalize only the public-token rename so the original palette fingerprints
      // guard every value against the current semantic role baseline.
      const entries = Object.entries(Themes[brand][mode])
        .map(([key, value]) => [
          key === '--mp-switch-checked-text-color' ? '--mp-internal-switch-checked-text-color' : key,
          value,
        ])
        .sort(([a], [b]) => a.localeCompare(b))
      hashes[`${brand}.${mode}`] = createHash('sha256').update(JSON.stringify(entries)).digest('hex')
    }
  }
  expect(hashes).toMatchInlineSnapshot(`
    {
      "alps.dark": "f470b21f17ea0d308c978d81b9102abdb6b55472f8b83c9047d84bc5ac1f615d",
      "alps.light": "9f94055a7c575ab67f1faccacb0009e45ba1cb6d1e8994a6e4b9f24e26380ca2",
      "default.dark": "7b1e01804819531722cea6bcfdeac29b240aa057e04154a92ef899eb1c6ada22",
      "default.light": "9369c6fc28488e944dc0983eb5c038927ba72e6ea3f21baaf31ba9e343959880",
      "maple.dark": "c5bb26c3329d65d9014b0e1c8c4b684540925d3dc598a01718fc3a10ae71586d",
      "maple.light": "0a39f54f0f31cad9deca5dbb464cdb1d79b32903963cec0c7fbe2b0849ac9147",
    }
  `)
})

// Non-default brand presets keep their original option shape in both modes.
test.each(['maple', 'alps', 'firefly'])('%s retains rounded popup options', (brand) => {
  for (const mode of ['light', 'dark']) {
    expect(Themes[brand][mode]['--mp-select-popup-option-border-radius']).toBe('var(--mp-sys-radius-lg)')
    expect(Themes[brand][mode]['--mp-selection-editor-option-radius']).toBe('var(--mp-selection-editor-radius)')
  }
})
