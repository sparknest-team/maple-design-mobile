import { proxyRefs } from 'vue'
import RangeContent from '../../time-range/presentation/TimePanelContent.vue'
import { getTimePickerState } from '../picker-columns'
import Content from '../presentation/TimePanelContent.vue'

// Inspect the owner-to-view boundary, not undocumented public instance properties.
export function panelState(wrapper) {
  const single = wrapper.findComponent(Content)
  const view = single.exists() ? single : wrapper.findComponent(RangeContent)
  const state = proxyRefs(view.props('state'))
  return new Proxy(state, {
    get(target, key) {
      if (key === 'update') {
        return (value) => target.handlePickerChange(getTimePickerState(value, view.props('options')).value)
      }
      return target[key]
    },
  })
}
