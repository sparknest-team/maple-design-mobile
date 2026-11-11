import { createHash } from 'node:crypto'
import { expect, test } from 'vitest'
import Themes from '..'

test('non-Firefly theme palettes remain unchanged by the Firefly role mapping', () => {
  const hashes = {}
  expect(Themes.maple.light['--mp-switch-checked-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
  expect(Themes.maple.light).not.toHaveProperty('--mp-internal-switch-checked-text-color')
  for (const brand of ['default', 'maple', 'alps']) {
    for (const mode of ['light', 'dark']) {
      // Normalize only the public-token rename so the original palette fingerprints
      // continue to guard every value, including Maple's checked-text foreground.
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
      "alps.dark": "93d21d98f45ce5da58dc9f4106d1d7a681945e27dcef943d61712d0dc4e10790",
      "alps.light": "469af9414c306a89e22a422751e416555496ef5fb16bbb4859b39b8db8c81992",
      "default.dark": "30673d5752878025befeab4ef7f9289366bba664c8cb9777f7b76151f4446ee9",
      "default.light": "1f84b8e006c7c520aab47e1a52b2dae706cf1949c05eaa9a359db23d6557a671",
      "maple.dark": "b8f1be8ab174100cd655e97260951580523391ad3e8c216f3e8f770f23a980e3",
      "maple.light": "aa446854fd2ee41fa5a88423f2c3b6fd48752754759368d89fa56af9802e43c6",
    }
  `)
})
