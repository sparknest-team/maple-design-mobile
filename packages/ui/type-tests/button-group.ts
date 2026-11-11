import type { ButtonGroupInstance, ButtonGroupProps } from '../src/button'

declare const group: ButtonGroupInstance
const elevation: boolean | number = group.buttonGroupProvider.elevation.value
const valid: ButtonGroupProps = { size: 'md', variant: 'outline', elevation: 4 }
// @ts-expect-error Public group elevation does not accept a string.
const invalid: ButtonGroupProps = { elevation: '4' }
// @ts-expect-error Exposed computed values are readonly.
group.buttonGroupProvider.elevation.value = 4
// @ts-expect-error The provider must not claim a string value.
const stringValue: string = group.buttonGroupProvider.elevation.value
void [elevation, valid, invalid, stringValue]
