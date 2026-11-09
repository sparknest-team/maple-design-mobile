import type { SplitButtonButtonProps, SplitButtonProps } from '@maple-design/ui'
import type { SplitButtonButtonProps as SubpathButtonProps } from '@maple-design/ui/split-button'

const button: SplitButtonButtonProps = { title: 'Save', onClick: (event: MouseEvent) => void event }
const trigger: SubpathButtonProps = {
  'aria-label': 'More',
  'aria-labelledby': 'label',
  onFocus: (event: FocusEvent) => void event,
}
const split: SplitButtonProps = { buttonProps: button, triggerButtonProps: trigger }
// @ts-expect-error Accessible labels must be strings.
const invalid: SplitButtonButtonProps = { 'aria-label': 42 }
void [split, invalid]
