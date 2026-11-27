import type { HTMLAttributes } from 'vue'

/** DOM attributes forwarded by the component to its semantic target. */
export type WithNativeAttributes<
  C extends abstract new (...args: never[]) => { $props: object },
  K extends keyof HTMLAttributes,
> = C &
  (new (...args: ConstructorParameters<C>) => InstanceType<C> & {
    $props: InstanceType<C>['$props'] & Pick<HTMLAttributes, K>
  })

export type WithNativeListeners<
  C extends abstract new (...args: never[]) => { $props: object },
  K extends Extract<keyof HTMLAttributes, `on${string}`>,
> = WithNativeAttributes<C, K>
