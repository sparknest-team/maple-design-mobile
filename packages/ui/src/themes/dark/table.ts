// Table 重构（2026-11-20）后 token 改名（thead-th-* → header-cell-*、tbody-td-* → body-cell-*、
// tr-hover-background → body-row-hover-bg 等），本文件此前仍写着旧名。旧名在源码里已无定义，
// 这些声明从未生效（不存在的自定义属性没有 CSS 规则消费），且会让 design-ui 的
// theme-contract 门禁报 "--mp-table-*: undefined theme override"。
// 这里只保留仍然存在的 token；新的暗色表格配色应基于重构后的语义 token 重新设计并做视觉验收。
export default {
  '--mp-table-border-radius': '2px',
}
