import { Themes } from '@maple-design/ui-vue'

export const themeMap = {
  defaultLightTheme: Themes.default.light,
  defaultDarkTheme: Themes.default.dark,
  mapleLightTheme: Themes.maple.light,
  mapleDarkTheme: Themes.maple.dark,
  alpsLightTheme: Themes.alps.light,
  fireflyLightTheme: Themes.firefly.light,
  alpsDarkTheme: Themes.alps.dark,
  fireflyDarkTheme: Themes.firefly.dark,
}

export function normalizeTheme(value: string | null) {
  return value && Object.hasOwn(themeMap, value) ? (value as keyof typeof themeMap) : 'defaultDarkTheme'
}
