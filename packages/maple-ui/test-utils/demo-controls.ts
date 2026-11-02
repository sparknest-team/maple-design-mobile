import { config } from '@vue/test-utils'
import { afterEach, beforeEach } from 'vitest'
import Button from '../src/button'
import Checkbox from '../src/checkbox'
import Form, { FormItem } from '../src/form'
import Input from '../src/input'
import InputNumber from '../src/input-number'
import { RadioGroup } from '../src/radio'
import Select from '../src/select'
import Space from '../src/space'
import Textarea from '../src/textarea'

/** Mount the same component controls that the documentation resolver provides. */
export function useDemoControls(testConfig = config) {
  let original = testConfig.global.components
  beforeEach(() => {
    original = testConfig.global.components
    testConfig.global.components = {
      ...original,
      MpForm: Form,
      MpFormItem: FormItem,
      MpRadioGroup: RadioGroup,
      MpSpace: Space,
      MpButton: Button,
      MpCheckbox: Checkbox,
      MpSelect: Select,
      MpInput: Input,
      MpInputNumber: InputNumber,
      MpTextarea: Textarea,
    }
  })
  afterEach(() => {
    testConfig.global.components = original
  })
}
