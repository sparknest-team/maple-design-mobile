import { emptyTextProp, emptyValueProp, emptyValuesProp } from '../../utils/empty-value'
import { popupContainerProp } from '../../utils/popup-container'
import { beforeFieldCommitProp, fieldEditModeProp, readPrettyProp } from './context'

/** Common field presentation API; pure panels do not receive these props. */
export const fieldPresentationProps = {
  /** 弹出编辑模式显示清空操作；不改变内联控件的交互。 */
  clearable: Boolean,
  emptyValue: emptyValueProp<unknown>(),
  /** 编辑模式，未设置时继承 FormItem / Form。 */
  editMode: fieldEditModeProp,
  readPretty: readPrettyProp,
  /** 模型空值识别；不改变受控判定或清空输出。 */
  emptyValues: emptyValuesProp,
  /** 纯阅读空值文案；字段 > FormItem > Form，缺省为 '-'。 */
  emptyText: emptyTextProp,
  beforeCommit: beforeFieldCommitProp,
  open: { type: Boolean, default: undefined },
  defaultOpen: Boolean,
  popupContainer: popupContainerProp,
}
