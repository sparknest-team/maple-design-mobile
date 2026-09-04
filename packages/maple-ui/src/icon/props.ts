export const props = {
  name: String,
  size: [Number, String],
  color: String,
  rotate: Number,
  spin: Boolean,
  transition: {
    type: [Number, String],
    default: 0,
  },
  animationClass: String,
}
