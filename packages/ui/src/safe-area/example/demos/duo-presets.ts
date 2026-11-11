// Safari 27.1 small / large viewports, in CSS px. These are not physical screen sizes.
// https://webkit.org/blog/18486/webkit-features-for-safari-27-1/
export const duoViewports = {
  'duo-outer-portrait': {
    label: 'Duo 外屏竖屏',
    width: 382,
    smallHeight: 580,
    largeHeight: 618,
    insets: { top: 0, right: 72, bottom: 34, left: 12 },
  },
  'duo-outer-landscape': {
    label: 'Duo 外屏横屏',
    width: 594,
    smallHeight: 368,
    largeHeight: 406,
    insets: { top: 0, right: 12, bottom: 21, left: 72 },
  },
  'duo-inner-portrait': {
    label: 'Duo 内屏竖屏',
    width: 669,
    smallHeight: 867,
    largeHeight: 902,
    insets: { top: 0, right: 72, bottom: 20, left: 12 },
  },
  'duo-inner-landscape': {
    label: 'Duo 内屏横屏',
    width: 951,
    smallHeight: 585,
    largeHeight: 620,
    insets: { top: 0, right: 72, bottom: 20, left: 12 },
  },
  'duo-split-left': {
    label: 'Duo 分屏左窗',
    width: 385,
    smallHeight: 571,
    largeHeight: 609,
    insets: { top: 0, right: 72, bottom: 20, left: 0 },
  },
  'duo-split-right': {
    label: 'Duo 分屏右窗',
    width: 385,
    smallHeight: 571,
    largeHeight: 609,
    insets: { top: 0, right: 0, bottom: 20, left: 72 },
  },
} as const
