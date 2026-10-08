import { proxyRefs } from 'vue'
import RangeContent from '../../time-range/presentation/TimePanelContent.vue'
import Content from '../presentation/TimePanelContent.vue'

// Inspect the owner-to-view boundary, not undocumented public instance properties.
export function panelState(wrapper) {
  const single = wrapper.findComponent(Content)
  const view = single.exists() ? single : wrapper.findComponent(RangeContent)
  return proxyRefs(view.props('state'))
}
