import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './input-tag'
import { getValueData } from './utils'

const Presented: typeof Base = withFieldPresentation(Base, {
  inheritInputGroup: true,
  intent: 'input',
  text: (value, props) => {
    const names = { value: 'value', label: 'label', closable: 'closable', tagProps: 'tagProps', ...props.fieldNames }
    return getValueData(Array.isArray(value) ? value : [], names, props.fallbackOption)
      .map((item) => props.formatTag?.(item.raw) ?? item.label ?? '')
      .join(', ')
  },
  changeArgs: (value, _props, event) => (event ? [value, event] : [value]),
})

export default Presented
