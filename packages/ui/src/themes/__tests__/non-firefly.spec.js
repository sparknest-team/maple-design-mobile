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
      "alps.dark": "df33f15d9c5ee08e8212b7c20b0663aa86b533e4b417671bd5f5500cf04065d2",
      "alps.light": "8a24bd73a87a0a28b1d0248d51389394e143655a1fa779bd8de835b75ea9226e",
      "default.dark": "bcb30c6d18cb812c88bc66f392deec3857a3489d1a154f489e545f06c9e7e0af",
      "default.light": "ee42dcb63865f0e77e3df1d6a45437d3dd7c30e12936d7916952a22111ddf597",
      "maple.dark": "cc945e6552276d5bace3f11c195aef5ef90ac077c3d3f3aad5dac76a8f21531d",
      "maple.light": "32b14670e2e52fe2bffe663e537c9fc0e30293ede0e8e979ced99be6fbdfdb40",
    }
  `)
})
