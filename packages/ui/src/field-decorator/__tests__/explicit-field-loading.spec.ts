import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Checkbox, { CheckboxGroup } from '../../checkbox'
import Input from '../../input'
import Radio, { RadioGroup } from '../../radio'
import Rate from '../../rate'
import Slider from '../../slider'
import Upload from '../../upload'
import VerificationCode from '../../verification-code'

describe('explicit loading is opt-in', () => {
  test.each([Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Rate, Upload, VerificationCode])(
    '%s does not expose generic loading',
    (Field) => {
      expect(Object.prototype.hasOwnProperty.call(Field.props, 'loading')).toBe(false)
    },
  )
  test.each([Input])('%s keeps loading on its input surface', async (Field) => {
    const w = mount(Field, { props: { loading: true } })
    try {
      expect(w.find('.mp-field-decorator__loading-icon').exists()).toBe(true)
      expect(w.emitted('change')).toBeUndefined()
      const native = w.find('input, textarea')
      const element = native.element
      await w.setProps({ loading: false })
      expect(w.find('input, textarea').element).toBe(element)
      expect(w.find('.mp-field-decorator__loading-icon').exists()).toBe(false)
    } finally {
      w.unmount()
    }
  })
})
test('readPretty input keeps explicit feedback without mounting its editor', async () => {
  const w = mount(Input, { props: { readPretty: true, loading: true } })
  try {
    expect(w.find('.mp-pending-feedback').exists()).toBe(true)
    expect(w.find('input').exists()).toBe(false)
    await w.setProps({ loading: false })
    expect(w.find('.mp-pending-feedback').exists()).toBe(false)
  } finally {
    w.unmount()
  }
})
