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
      "alps.dark": "960506c1266741904c57aefed1c3c1c7b783014741f9d9114d71980715479990",
      "alps.light": "02ff4b51ca6d6b47bda0dead799f0b633dfa2643c687df755919ee8a53b27b02",
      "default.dark": "4641b3d417d9b441437a81edfc063f23ca99349220a136d8dd7f6ac5281020c5",
      "default.light": "9369c6fc28488e944dc0983eb5c038927ba72e6ea3f21baaf31ba9e343959880",
      "maple.dark": "9684811bb5ce81b1f379a79dccbc2399a13fe494606ff82d1cbecf8880d23aba",
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
