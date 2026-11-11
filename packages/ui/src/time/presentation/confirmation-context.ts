import type { InjectionKey, Ref } from 'vue'

/** Now stages an explicit-confirm transaction even when ordinary selections commit immediately. */
export const timeExplicitConfirmation: InjectionKey<Ref<boolean>> = Symbol('time-explicit-confirmation')
