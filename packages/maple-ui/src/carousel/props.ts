import type { ExtractPublicPropTypes, PropType } from 'vue'
import type {
  CarouselArrowType,
  CarouselAutoPlayConfig,
  CarouselDirection,
  CarouselEffect,
  CarouselIndicatorPosition,
  CarouselIndicatorType,
  CarouselTriggerEvent,
} from './types'

export const carouselProps = {
  /** 受控页序号，从 1 开始 */ modelValue: Number,
  /** 非受控初始页 */ defaultValue: { type: Number, default: 1 },
  /** 循环切换 */ loop: { type: Boolean, default: true },
  /** 自动播放，数字为毫秒 */ autoPlay: {
    type: [Boolean, Number, Object] as PropType<boolean | number | CarouselAutoPlayConfig>,
    default: false,
  },
  /** 切换时长，毫秒；省略使用样式变量 */ moveSpeed: Number,
  /** 指示器触发方式 */ trigger: { type: String as PropType<CarouselTriggerEvent>, default: 'click' },
  /** 内部运动方向 */ direction: { type: String as PropType<CarouselDirection>, default: 'horizontal' },
  /** 箭头显示策略 */ showArrow: { type: String as PropType<CarouselArrowType>, default: 'always' },
  /** 箭头附加类 */ arrowClass: String,
  /** 显示指示器 */ indicator: { type: Boolean, default: true },
  /** 指示器形态 */ indicatorType: { type: String as PropType<CarouselIndicatorType>, default: 'dot' },
  /** 指示器位置 */ indicatorPosition: { type: String as PropType<CarouselIndicatorPosition>, default: 'bottom' },
  /** 指示器附加类 */ indicatorClass: String,
  /** 指示器颜色 */ indicatorColor: String,
  /** 容器高度 */ height: [String, Number],
  /** 自定义切换缓动 */ transitionTimingFunction: String,
  /** 启用触摸拖动 */ touchable: { type: Boolean, default: true },
  /** 启用鼠标拖动，可与触摸同时启用 */ draggable: Boolean,
  /** 启用滚轮 */ mousewheel: Boolean,
  /** 启用组件内方向键 */ keyboard: Boolean,
  /** 可视页数，auto 使用子项自身尺寸 */ slidesPerView: {
    type: [String, Number] as PropType<number | 'auto'>,
    default: 1,
  },
  /** 项间距，数字为 px */ spaceBetween: { type: [String, Number], default: 0 },
  /** slide、fade 或 card；fade 始终展示一页 */ effect: { type: String as PropType<CarouselEffect>, default: 'slide' },
  /** 当前项居中 */ centeredSlides: Boolean,
  /** 可访问名称 */ ariaLabel: String,
  /** 上一页按钮名称 */ previousButtonAriaLabel: String,
  /** 下一页按钮名称 */ nextButtonAriaLabel: String,
}
export const carouselItemProps = {}
export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>
export type CarouselItemProps = ExtractPublicPropTypes<typeof carouselItemProps>
