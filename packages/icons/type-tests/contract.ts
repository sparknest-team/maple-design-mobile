import type { App } from 'vue'
import { IconAlert as RootIcon, type IconComponent, type IconProps as PublicIconProps } from '../src'
import { IconAlert } from '../src/icon-alert'
import OriginalIcon from '../src/icon-alert/icon-alert.vue'

type IconProps = InstanceType<typeof IconAlert>['$props']
const valid: IconProps = { size: 12, strokeLinecap: 'round', onClick: (event: MouseEvent) => event.preventDefault() }
// @ts-expect-error icon size does not accept a boolean
const invalidSize: IconProps = { size: false }
// @ts-expect-error icon strokeLinecap only accepts valid SVG values
const invalidStroke: IconProps = { strokeLinecap: 'invalid' }
// @ts-expect-error icon click receives a MouseEvent
const invalidClick: IconProps = { onClick: (event: string) => event.length }
const original: typeof OriginalIcon = IconAlert
const compatible: typeof IconAlert = Object.assign(OriginalIcon, { install(_app: App) {} })
void [valid, invalidSize, invalidStroke, invalidClick, original, compatible, RootIcon]

const publicComponent: IconComponent = RootIcon
const publicProps: PublicIconProps = { size: 12, strokeLinecap: 'round' }
void [publicComponent, publicProps]
