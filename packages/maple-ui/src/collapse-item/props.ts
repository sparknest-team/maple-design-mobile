export const props = {
  name: [String, Number],
  title: String,
  icon: {
    type: String,
    default: 'chevron-down',
  },
  disabled: Boolean,
  showExpandIcon: {
    type: Boolean,
    default: true,
  },
  destroyOnHide: Boolean,
}
