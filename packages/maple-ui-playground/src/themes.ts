import { Themes } from '@maple-design/ui'

export const themeMap = {
  defaultLightTheme: Themes.default.light,
  defaultDarkTheme: Themes.default.dark,
  mapleLightTheme: Themes.maple.light,
  mapleDarkTheme: Themes.maple.dark,
}

export function normalizeTheme(value: string | null) {
  return value && Object.hasOwn(themeMap, value) ? (value as keyof typeof themeMap) : 'defaultDarkTheme'
}
