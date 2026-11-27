import type { AllowedComponentProps, App, ComponentCustomProps, ComponentOptionsMixin, DefineComponent, SVGAttributes, VNodeProps } from 'vue'

export interface IconProps {
  size?: string | number
  color?: string
  title?: string
  strokeWidth?: number
  strokeLinecap?: 'butt' | 'round' | 'square'
  strokeLinejoin?: 'bevel' | 'inherit' | 'miter' | 'round'
  rotate?: number
  spin?: boolean
}

type IconEmits = { click: (event: MouseEvent) => any }
type IconDefaults = {
  strokeWidth: number
  strokeLinecap: NonNullable<IconProps['strokeLinecap']>
  strokeLinejoin: NonNullable<IconProps['strokeLinejoin']>
}

export type IconComponent = DefineComponent<
  IconProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, IconEmits, string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<IconProps> & Pick<SVGAttributes, 'aria-hidden'> & Readonly<{ onClick?: (event: MouseEvent) => any }>,
  IconDefaults
> & { install(app: App): void }
