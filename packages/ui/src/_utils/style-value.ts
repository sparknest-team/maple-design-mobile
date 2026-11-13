import type { CSSProperties } from 'vue'
import type * as CSS from 'csstype'

/** Vue 3.5 StyleValue expressed using types also exported by Vue 3.2. */
type CompatibleCSSProperties = `--${string}` extends keyof CSSProperties
  ? CSSProperties
  : CSSProperties &
      CSS.PropertiesHyphen<string | number> & {
        [key: `--${string}`]: string | number | undefined
      }
export type CompatibleStyleValue = false | null | undefined | string | CompatibleCSSProperties | CompatibleStyleValue[]
