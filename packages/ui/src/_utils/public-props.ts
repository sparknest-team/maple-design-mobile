import type { ExtractPropTypes } from 'vue'

// Vue 3.2's ExtractPropTypes treats default: undefined as the value type.
// Defaults do not make a prop required for callers, so remove them before inference.
type WithoutDefaults<P> = { [K in keyof P]: P[K] extends { type: unknown } ? Omit<P[K], 'default'> : P[K] }
type RequiredKeys<P> = { [K in keyof P]-?: P[K] extends { required: true } ? K : never }[keyof P]
type Resolved<P> = ExtractPropTypes<WithoutDefaults<P>>

/** Public prop shape for Vue versions before ExtractPublicPropTypes. */
export type CompatiblePublicProps<P> = Pick<Resolved<P>, Extract<RequiredKeys<P>, keyof Resolved<P>>> &
  Partial<Omit<Resolved<P>, RequiredKeys<P>>>
